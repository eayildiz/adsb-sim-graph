import string

class Plane:
    def __init__(self, plane_code: string, latitude: float, longtitude: float, geo_altitude: float):
        self.plane_code = plane_code
        self.altitude = latitude
        self.longtitude = longtitude
        self.height = geo_altitude

    def GetJson(self):
        #Creat json from plane obj.
        pass

    def GetPlaneFromJson(json: string.String):
        #Create plane obj from json string.
        pass