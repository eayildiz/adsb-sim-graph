from opensky_api import OpenSkyApi
from DataTypes import Plane

api = OpenSkyApi()

# returns flights in the bounds specified in a list, None if nothing is found
def getFlightsByBounds(longitude_begin: int, longitude_end: int, latitude_begin: int, latitude_end: int):
    flights = []
    coordinates = api.get_states(bbox=(latitude_begin, latitude_end, longitude_begin, longitude_end))
    if (coordinates == None):
        return flights
    for vector in coordinates.states:
        if (vector.latitude is not None and vector.longitude is not None):
            flight = Plane(vector.icao24, vector.latitude, vector.longitude, vector.geo_altitude)
            flights.append(flight)
    return flights

# returns the flight with the ICAO address specified in a list, None if nothing is found
def getFlightByAddress(icaoAddress: str):
    flights = []
    coordinates = api.get_states(icao24=icaoAddress)
    if (coordinates == None):
        return flights
    for vector in coordinates.states:
        flight = Plane(vector.icao24, vector.latitude, vector.longitude, vector.geo_altitude)
        flights.append(flight)
    return flights