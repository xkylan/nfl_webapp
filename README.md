# K2 Football Stats Webapp

### View the website at www.k2nflstats.com

## Dev Setup

### React Setup
The frontend is built using `React` and `@material-ui` components. All of the relevant frontend code is contained in `/frontend`.

The components are stored in `/frontend/src` and `/frontend/public` contains assets, mostly images.

1. `$ cd frontend`
2. `$ npm install`

If you would like to start up a dev server, call `$ npm start`.

If you would like to build the components for production, call `$ npm build`. 

The dev server is bound to 127.0.0.1 and port 5000 by default, reachable at `http://localhost:5000` or `http:127.0.0.1:5000`.

### Flask Setup
The following is for dev use only, on your local machine (different procedure for production).

From the root directory,

1. `$ python -m venv nfl_venv`
	- Create the Python virtual environment
2. `$ source nfl_venv/bin/activate`
	- Activate virtual env
3. `$ pip install -r requirements.txt`
	- Download required libraries
4. `$ flask run`
	- Starts the dev server. Do not use this for production.

The dev server will now run on `http://localhost:3000`.

### Database Setup (sqlite)
We use a lightweight SQLite database, which (as of now) only needs to store each team's leverages from our simulations.
**The following loads fake, mock data**

1. Open `load_database.py` and change `TEAMS_CSV` to the absolute path of `nfl_teams.csv`, which is located in the root directory.
2. `$ python load_database.py`
	- This creates the SQLite db and populates it with 3 weeks of dummy data.
