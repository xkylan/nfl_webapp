from sqlalchemy import *
import pandas as pd
import datetime
import random
import json
import copy

TEAMS_CSV = "/Users/kylan/Downloads/nfl_website/nfl_teams.csv"

def read_teams_from_csv():
	# load teams
	df = pd.read_csv(TEAMS_CSV)
	team_dicts = []
	for _,row in df.iterrows():
		curr_team = {
			'team_id': row['team_id'], 
			'team_name': row['team_name']
		}
		team_dicts.append(curr_team)
	return team_dicts

# TODO: replace with API to pull game data
def populate_games(conn, team_dicts, games_table):
	NUM_MOCK_WEEKS = 3

	# get all teams in a set
	all_teams = []
	all_teams_backup = []

	all_games = []

	_teams = conn.execute("select * from team")
	for _t in _teams:
		all_teams.append(_t['team_id'])

	for i in range(1, NUM_MOCK_WEEKS + 1):
		for j in range(16): # create 16 games per week
			date = '11/5/2020'
			date = datetime.datetime.strptime(date, '%d/%m/%Y').date()
			week = i
			home_team = random.choice(all_teams)
			all_teams.remove(home_team)
			all_teams_backup.append(home_team)

			away_team = random.choice(all_teams)
			all_teams.remove(away_team)
			all_teams_backup.append(away_team)

			leverage = {}
			for _type in ['playoffs', 'division', 'bye']:
				curr_leverage = {}
				if _type == 'playoffs':
					home_p_w_win = random.randint(100, 500)
					home_p_w_loss = random.randint(90, home_p_w_win)
					away_p_w_win = random.randint(100, 500)
					away_p_w_loss = random.randint(90, away_p_w_win)
				elif _type == 'division':
					home_p_w_win = random.randint(100, 300)
					home_p_w_loss = random.randint(80, home_p_w_win)
					away_p_w_win = random.randint(100, 300)
					away_p_w_loss = random.randint(80, away_p_w_win)
				elif _type == 'bye':
					home_p_w_win = random.randint(10, 120)
					home_p_w_loss = random.randint(10, home_p_w_win)
					away_p_w_win = random.randint(10, 120)
					away_p_w_loss = random.randint(10, away_p_w_win)

				leverage[_type] = {
					'home_p_w_win': home_p_w_win,
					'home_p_w_loss': home_p_w_loss,
					'away_p_w_win': away_p_w_win,
					'away_p_w_loss': away_p_w_loss
				}

			curr_game = {
				'date': date,
				'week': week, 
				'home_team': home_team, 
				'away_team': away_team, 
				'leverage': json.dumps(leverage)
			}
			all_games.append(curr_game)
		all_teams = copy.deepcopy(all_teams_backup)
		all_teams_backup = []
	conn.execute(games_table.insert(), all_games)


def create_tables(metadata):
	team = Table('team', metadata,
		Column('team_id', String(3), primary_key=True),
		Column('team_name', String(64))
	)

	# leverage is a json string to contain leverages for playoffs, division, bye, etc
	game = Table('game', metadata,
		Column('game_id', Integer, primary_key=True),
		Column('date', Date),
		Column('week', Integer),
		Column('home_team', ForeignKey("team.team_id"), nullable=False),
		Column('away_team', ForeignKey("team.team_id"), nullable=False),
		Column('leverage', String(400)),
	)
	# Create all tables
	metadata.create_all()
	print("Created the following tables:")
	for _t in metadata.tables:
	   print("Table: ", _t)
	return team, game

def populate_teams(conn, team_dicts, team_table):
	teams = conn.execute("select * from team")
	if not teams.fetchone():
		conn.execute(team_table.insert(), team_dicts)

def table_exists(name, engine):
    ret = engine.dialect.has_table(engine, name)
    print('Table "{}" exists: {}'.format(name, ret))
    return ret

def main():
	DB_URI = 'sqlite:///nfl_viz.sqlite'
	engine = create_engine(DB_URI)
	conn = engine.connect()

	# Create a metadata instance
	metadata = MetaData(engine)

	team_table, games_table = create_tables(metadata)

	team_dicts = read_teams_from_csv()
	populate_teams(conn, team_dicts, team_table)
	populate_games(conn, team_dicts, games_table)


if __name__ == "__main__":
	main()