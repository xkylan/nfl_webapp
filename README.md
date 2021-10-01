# K2 Football Stats Webapp

## Dev Setup

### React Setup
The frontend is built using `React` and `@material-ui` components. All of the relevant frontend code is contained in `/frontend`.

The components are stored in `/frontend/src` and `/frontend/public` contains assets, mostly images.

1. `$ cd frontend`
2. `$ npm install`

If you would like to start up a dev server, call `$ npm start`.

If you would like to build the components for production, call `$ npm build`. 

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