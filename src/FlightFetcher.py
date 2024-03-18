from DataTypes import Plane
import requests

# returns flights in the bounds specified in a list, None if nothing is found
def getFlightsByBounds(latitude: float, longitude: float, radius: float):
    flights = []
    try:
        aircrafts = requests.get('https://opendata.adsb.fi/api/v2/lat/' + str(latitude) + '/lon/' + str(longitude) + '/dist/' + str(radius)).json()['aircraft']
        if (len(aircrafts) == 0):
            return flights
        for aircraft in aircrafts:
            if (aircraft['alt_baro'] != "ground" and 'lat' in aircraft and 'lon' in aircraft and 'alt_geom' in aircraft):
                flight = Plane(aircraft['hex'], aircraft['lat'], aircraft['lon'], aircraft['alt_geom'])
                flights.append(flight)
        return flights
    except requests.exceptions.JSONDecodeError:
        print('API server error.')
        return flights

# returns the flight with the ICAO address specified in a list, None if nothing is found
def getFlightByAddress(icaoAddress: str):
    flights = []
    try:
        aircraft = requests.get('https://opendata.adsb.fi/api/v2/icao/' + icaoAddress).json()
        print(aircraft)
        if (len(aircraft) == 0):
            return flights
        if (aircraft['ac'][0]['alt_baro'] != "ground" and 'lat' in aircraft['ac'][0] and 'lon' in aircraft['ac'][0] and 'alt_geom' in aircraft['ac'][0]):
            flight = Plane(aircraft['ac'][0]['hex'], aircraft['ac'][0]['lat'], aircraft['ac'][0]['lon'], aircraft['ac'][0]['alt_geom'])
            flights.append(flight)
        return flights
    except requests.exceptions.JSONDecodeError:
        print('API server error.')
        return flights