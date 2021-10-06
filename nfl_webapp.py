from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
# from api.testAPIHandler import testAPIHandler
# from api.leverageAPIHandler import leverageAPIHandler
import json

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
#CORS(app) #comment this on deployment
# api = Api(app)

DB_URI = 'sqlite:///nfl_viz.sqlite'
engine = create_engine(DB_URI)

metadata = MetaData(engine)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route("/leverage")
def all_leverage():
    conn = engine.connect(engine)
    sql = "select * from game order by week asc"
    all_games = conn.execute(sql)
    response = {'games': []}

    for _g in all_games:
        game_dict = {}
        for _k in _g.keys():
            if _k == 'leverage':
                leverage = json.loads(_g['leverage'])
                game_dict['leverage'] = leverage
            else:
                game_dict[_k] = _g[_k]
        response['games'].append(game_dict)
    return response


@app.route("/leverage/<team_id>")
def leverage(team_id):
    conn = engine.connect(engine)
    sql = "select * from game where home_team = :team_id or away_team = :team_id order by week asc"
    games = conn.execute(sql, {'team_id': team_id})
    response = {'games': []}
    for _g in games:
        game_dict = {}
        for _k in _g.keys():
            if _k == 'leverage':
                leverage = json.loads(_g['leverage'])
                game_dict['leverage'] = leverage
            else:
                game_dict[_k] = _g[_k]

        response['games'].append(game_dict)
    return response

@app.route("/leverage/<team_id>/csv")
def leverage_csv(team_id):
    conn = engine.connect(engine)
    sql = "select * from game where home_team = :team_id or away_team = :team_id order by week asc"
    games = conn.execute(sql, {'team_id': team_id})
    csv_str = "week,opponent,home,playoff_leverage,division_leverage,bye_leverage,date\n"
    for _g in games:
        csv_str += str(_g['week']) + ","
        home = _g["home_team"] == team_id
        leverage_json = json.loads(_g["leverage"])
        if home:
            csv_str += _g["away_team"] + "," + "true,"
            playoff_leverage = leverage_json['playoffs']["home_p_w_win"] - leverage_json['playoffs']["home_p_w_loss"]
            division_leverage = leverage_json['division']["home_p_w_win"] - leverage_json['division']["home_p_w_loss"]
            bye_leverage = leverage_json['bye']["home_p_w_win"] - leverage_json['bye']["home_p_w_loss"]
        else:
            csv_str += _g["home_team"] + "," + "false,"
            playoff_leverage = leverage_json['playoffs']["away_p_w_win"] - leverage_json['playoffs']["away_p_w_loss"]
            division_leverage = leverage_json['division']["away_p_w_win"] - leverage_json['division']["away_p_w_loss"]
            bye_leverage = leverage_json['bye']["away_p_w_win"] - leverage_json['bye']["away_p_w_loss"]
        csv_str += str(playoff_leverage/float(1000)) + "," + str(division_leverage/float(1000)) + "," + str(bye_leverage/float(1000)) + ","
        csv_str += _g["date"] + "\n"
    return csv_str

@app.route("/teams")
def get_teams():
    conn = engine.connect(engine)
    sql = "select * from team order by team_name asc"
    teams = conn.execute(sql)
    response = {'teams': []}
    for _t in teams:
        team_json = {}
        for _k in _t.keys():
            team_json[_k] = _t[_k]
        response['teams'].append(team_json)
    return response

if __name__ == "__main__":
    #app.run(host='204.48.31.219')
    app.run(host="0.0.0.0")

# api.add_resource(testAPIHandler, '/flask/hello')
# api.add_resource(leverageAPIHandler, '/leverage')