from DataTypes import Plane
import requests

# returns flights in the bounds specified in a list, None if nothing is found
def getFlightsByBounds(latitude: float, longitude: float, radius: float):
    flights = []
    aircrafts = requests.get('https://opendata.adsb.fi/api/v2/lat/' + str(latitude) + '/lon/' + str(longitude) + '/dist/' + str(radius)).json()['aircraft']
    if (aircrafts is None):
        return flights
    for aircraft in aircrafts:
        if (aircraft['alt_baro'] != "ground" and 'lat' in aircraft and 'lon' in aircraft and 'alt_geom' in aircraft):
            flight = Plane(aircraft['hex'], aircraft['lat'], aircraft['lon'], aircraft['alt_geom'])
            flights.append(flight)
    return flights

# returns the flight with the ICAO address specified in a list, None if nothing is found
def getFlightByAddress(icaoAddress: str):
    flights = []
    aircraft = requests.get('https://opendata.adsb.fi/api/v2/icao/' + icaoAddress).json()['ac']
    if (aircraft is None):
        return flights
    if (aircraft[0]['alt_baro'] != "ground" and 'lat' in aircraft[0] and 'lon' in aircraft[0] and 'alt_geom' in aircraft[0]):
        flight = Plane(aircraft[0]['hex'], aircraft[0]['lat'], aircraft[0]['lon'], aircraft[0]['alt_geom'])
        flights.append(flight)
    return flights