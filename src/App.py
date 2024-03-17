import DataManipulation
import FlightFetcher
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

@app.get("/")
def homepage():
    return render_template("index.html")

@app.post("/")
def simulateDataManipulation():
    # global parameters obtained through query parameters
    type = int(request.args.get("type"))
    lat_r = float(request.args.get("latr"))
    lng_r = float(request.args.get("lngr"))
    ht_r  = float(request.args.get("htr"))
    # filter type: 0 is by ICAO address, 1 is by range
    if (type == 0):
        # receive icao address through query parameter
        icao = request.args.get("icao")
        flightData = []
        flights = FlightFetcher.getFlightByAddress(icao)
        # return bad request if nothing is found
        if not flights:
            response = jsonify({'error': 'No such flight(s) found.'})
            response.status_code = 400
            return response
        serialized_flights_og = [flight.__json__() for flight in flights.copy()]
        flightData.append(serialized_flights_og)
        try: 
            manipulateFlight(flights, lat_r, lng_r, ht_r)
            serialized_flights_new = [flight.__json__() for flight in flights]
            flightData.append(serialized_flights_new)
            response = jsonify({'flights': flightData})
            response.status_code = 200
            return response
        # return bad request if positions are invalid
        except ValueError:
            response = jsonify({'error': 'Invalid range.'})
            response.status_code = 400
            return response
    elif (type == 1):
        # receive positions through query parameters
        min_lat = float(request.args.get("latb"))
        max_lat = float(request.args.get("late"))
        min_lng = float(request.args.get("lngb"))
        max_lng = float(request.args.get("lnge"))
        flightData = []
        flights = FlightFetcher.getFlightsByBounds(min_lng, max_lng, min_lat, max_lat)
        if not flights:
            response = jsonify({'error': 'No such flight(s) found.'})
            response.status_code = 400
            return response
        serialized_flights_og = [flight.__json__() for flight in flights.copy()]
        flightData.append(serialized_flights_og)
        try: 
            manipulateFlight(flights, ht_r, lat_r, lng_r)
            serialized_flights_new = [flight.__json__() for flight in flights]
            flightData.append(serialized_flights_new)
            response = jsonify({'flights': flightData})
            response.status_code = 200
            return response
        except ValueError:
            response = jsonify({'error': 'Invalid range.'})
            response.status_code = 400
            return response

def manipulateFlight(flights, latitudeRate, longitudeRate, heightRate):
    DataManipulation.changeData(flights, latitudeRate, longitudeRate, heightRate)
    
if(__name__ == "__main__"):
    homepage()