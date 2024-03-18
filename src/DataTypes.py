# denotes a flight with its ICAO address, and positions in longitude/latitude and altitude at the time
class Plane:
    def __init__(self, plane_code: str, latitude: float, longitude: float):
        self.plane_code = plane_code
        self.latitude = latitude
        self.longitude = longitude

    def __json__(self):
        return {
            'icao': self.plane_code,
            'latitude': self.latitude,
            'longitude': self.longitude,
        }    

# validation to see if positions hold true after manipulation  
    def validateFlight(self):
            if (self.latitude > 90 or self.latitude < -90):
                raise ValueError("Invalid range.")
            if (self.longitude > 180 or self.longitude < -180):
                raise ValueError("Invalid range.")