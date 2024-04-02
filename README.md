# adsb-sim-graph
Done as demonstrative work for a project at school, this website allows the users to run ADS-B simulations by receiving parameters to alter live trajectories of flights and plotting them on both a map and graph simulatenously.  
Flight tracking data is received through the API of [adsb.fi](https://github.com/adsbfi/opendata)

## Using the App
1. Select the filters you want to apply. You can either search for a single flight by selecting "Find By Flight Name" and entering the ICAO24 address of the flight you want to observe or search for multiple flights by picking "Find By Range" and entering the latitude, longitude and range/radius. Note that range/radius must be in nautical mile (NM)
2. Click "Apply Pre-Settings" then adjust the rates you want to alter latitude and longitude by. Note that this represents a percentage.
3. Click Apply Changes. You can alter between the map and graph by the menu.

## Dependencies
This app uses the following dependencies:  
* Flask
* PyTest
* [Requests](https://pypi.org/project/requests/)
* React
* Axios
* Recharts

## Running the App
For the time being, this app runs locally.
1. Clone this repository.
2. Navigate to the directory where you cloned the repository.
3. Install the dependencies listed above with `pip install`
4. Navigate to the source directory and run the app with `flask run`
5. Navigate to the client directory and install the libraries required by React with `npm install`
6. Launch the page with `npm start`
