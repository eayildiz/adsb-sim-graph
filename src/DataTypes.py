# denotes a flight with its ICAO address, and positions in longitude/latitude and altitude at the time
class Plane:
    def __init__(self, plane_code: str, latitude: float, longitude: float, geo_altitude: float):
        self.plane_code = plane_code
        self.latitude = latitude
        self.longitude = longitude
        self.geo_altitude = geo_altitude

    def __json__(self):
        return {
            'callsign': self.plane_code,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'geo_altitude': self.geo_altitude
        }    

# validation to see if positions hold true after manipulation  
    def validateFlight(self):
            if (self.latitude > 90 or self.latitude < -90):
                raise ValueError("Invalid range.")
            if (self.longitude > 180 or self.longitude < -180):
                raise ValueError("Invalid range.")
            if (self.geo_altitude is not None and self.geo_altitude < 0):
                raise ValueError("Invalid range.")