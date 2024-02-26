import string

class Plane:
    def __init__(self, altitude: float, longtitude: float, height: float):
        self.altitude = altitude
        self.longtitude = longtitude
        self.height = height

    def GetJson(self):
        #Creat json from plane obj.
        pass

    def GetPlaneFromJson(json: string.String):
        #Create plane obj from json string.
        pass