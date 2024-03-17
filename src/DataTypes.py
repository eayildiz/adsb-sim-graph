class Plane:
    def __init__(self, plane_code: str, latitude: float, longitude: float, geo_altitude: float):
        self.plane_code = plane_code
        self.latitude = latitude
        self.longitude = longitude
        self.geo_altitude = geo_altitude
    
    def validateFlight(self):
            if (self.latitude > 90 or self.latitude > -90):
                return ValueError
            if (self.longitude > 180 or self.longitude < -180):
                return ValueError
            if (self.geo_altitude < 0):
                return ValueError