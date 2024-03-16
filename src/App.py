import DataManipulation
import FlightFetcher
from flask import Flask, request, render_template

app = Flask(__name__)

@app.get("/adsb-sim")
def homepage():
    return render_template("home.html")

@app.post("/adsb-sim")
def simulateDataManipulation():
    type = request.args.get("type")
    lat_r = request.args.get("latm")
    lng_r = request.args.get("lngr")
    ht_r  = request.args.get("htm")
    if (type == 0):
        icao = request.args.get("icao")
        flightData = []
        flights = FlightFetcher.getFlightByAddress(icao)
        flightData.append(flights.copy())
        manipulateFlight(flights, lat_r, lng_r, ht_r)
        flightData.append(flights)
        return flights
    elif (type == 1):
        min_lat = request.args.get("latb")
        max_lat = request.args.get("late")
        min_lng = request.args("lngb")
        max_lng = request.args("lnge")
        flightData = []
        flights = FlightFetcher.getFlightsByBounds(min_lng, max_lng, min_lat, max_lat)
        flightData.append(flights.copy())
        manipulateFlight(flights, lat_r, lng_r, ht_r)
        flightData.append(flights)
        return flights

def manipulateFlight(flights, latitudeRate, longitudeRate, heightRate):
    DataManipulation.changeData(flights, latitudeRate, longitudeRate, heightRate)

def main():
    #Create build classes for every component.
    #Create connection to API
    #load data
    #load UI
    #Create socket
    pass

if(__name__ == "__main__"):
    main()
