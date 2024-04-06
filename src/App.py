import DataManipulation
import FlightFetcher
from DataTypes import Plane
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)
flightData = [[], []]
elapsedTime = 0

@app.get("/")
def homepage():
    return render_template("index.html")

@app.post("/")
def simulateDataManipulation():
    global flightData
    global elapsedTime
    # global parameters obtained through query parameters
    type = int(request.args.get("type"))
    lat_r = float(request.args.get("latr"))
    lng_r = float(request.args.get("lngr"))
    # filter type: 0 is by ICAO address, 1 is by range
    if (type == 0):
        # receive icao address through query parameter
        icao = request.args.get("icao")
        flights = FlightFetcher.getFlightByAddress(icao)
        for flight in flights:
            Plane.setTime(flight, elapsedTime)
        # return bad request if nothing is found
        if len(flights) == 0:
            response = jsonify({'error': 'No such flight(s) found.'})
            response.status_code = 400
            return response
        serialized_flights_og = [flight.__json__() for flight in flights.copy()]
        flightData[0].append(serialized_flights_og)
        try:
            manipulateFlight(flights, lat_r, lng_r)
            serialized_flights_new = [flight.__json__() for flight in flights]
            flightData[1].append(serialized_flights_new)
            response = jsonify({'flights': flightData})
            response.status_code = 200
            return response
        # return bad request if positions are invalid
        except ValueError:
            response = jsonify({'error': 'Invalid range.'})
            response.status_code = 400
            return response
        finally:
            elapsedTime += 10
    elif (type == 1):
        # receive positions through query parameters
        lat = float(request.args.get("lat"))
        lon = float(request.args.get("lon"))
        rad = float(request.args.get("rad"))
        liveFlightData = [[], []]
        flights = FlightFetcher.getFlightsByBounds(lat, lon, rad)
        for flight in flights:
            Plane.setTime(flight, elapsedTime)
        if len(flights) == 0:
            response = jsonify({'error': 'No such flight(s) found.'})
            response.status_code = 400
            return response
        serialized_flights_og = [flight.__json__() for flight in flights.copy()]
        flightData[0].append(serialized_flights_og)
        liveFlightData[0].append(serialized_flights_og)
        try:
            manipulateFlight(flights, lat_r, lng_r)
            serialized_flights_new = [flight.__json__() for flight in flights]
            flightData[1].append(serialized_flights_new)
            liveFlightData[1].append(serialized_flights_new)
            response = jsonify({'flights': flightData, 'live': liveFlightData})
            response.status_code = 200
            return response
        except ValueError:
            response = jsonify({'error': 'Invalid range.'})
            response.status_code = 400
            return response
        finally:
            elapsedTime += 10
        
@app.get("/reset")
def flushFlightData():
    global flightData
    global elapsedTime
    flightData = [[], []]
    elapsedTime = 0
    response = jsonify({'message': 'Successfully flushed.'})
    response.status_code = 200
    return response

def manipulateFlight(flights, latitudeRate, longitudeRate):
    DataManipulation.changeData(flights, latitudeRate, longitudeRate)
    
if(__name__ == "__main__"):
    homepage()