import DataManipulation
import FlightFetcher
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

@app.get("/")
def homepage():
    return render_template("home.html")

@app.post("/")
def simulateDataManipulation():
    type = request.args.get("type")
    lat_r = request.args.get("latm")
    lng_r = request.args.get("lngr")
    ht_r  = request.args.get("htm")
    if (type == 0):
        icao = request.args.get("icao")
        flightData = []
        flights = FlightFetcher.getFlightByAddress(icao)
        if not flights:
            response = jsonify({'error: No such flight(s) found.'})
            response.status_code = 400
            return response
        flightData.append(flights.copy())
        try: 
            manipulateFlight(flights, lat_r, lng_r, ht_r)
            flightData.append(flights)
            return flights
        except ValueError:
            response = jsonify(['error: Invalid range.'])
            response.status_code = 400
            return response
    elif (type == 1):
        min_lat = request.args.get("latb")
        max_lat = request.args.get("late")
        min_lng = request.args("lngb")
        max_lng = request.args("lnge")
        flightData = []
        flights = FlightFetcher.getFlightsByBounds(min_lng, max_lng, min_lat, max_lat)
        if not flights:
            response = jsonify({'error: No such flight(s) found.'})
            response.status_code = 400
            return response
        flightData.append(flights.copy())
        try: 
            manipulateFlight(flights, lat_r, lng_r, ht_r)
            flightData.append(flights)
            return flights
        except ValueError:
            response = jsonify(['error: Invalid range.'])
            response.status_code = 400
            return response

def manipulateFlight(flights, latitudeRate, longitudeRate, heightRate):
    DataManipulation.changeData(flights, latitudeRate, longitudeRate, heightRate)
    
if(__name__ == "__main__"):
    homepage()