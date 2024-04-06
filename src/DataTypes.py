# denotes a flight with its ICAO address, and positions in longitude/latitude and altitude at the time
class Plane:
    def __init__(self, plane_code: str, latitude: float, longitude: float, time: int):
        self.plane_code = plane_code
        self.latitude = latitude
        self.longitude = longitude
        self.time = time

    def __json__(self):
        return {
            'icao': self.plane_code,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'time': self.time
        }

    def setTime(flight, time):
        flight.time = time    

# validation to see if positions hold true after manipulation  
    def validateFlight(self):
            if (self.latitude > 90 or self.latitude < -90):
                raise ValueError("Invalid range.")
            if (self.longitude > 180 or self.longitude < -180):
                raise ValueError("Invalid range.")