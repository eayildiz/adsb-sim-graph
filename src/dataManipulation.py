import DataTypes as DT

class dataManipulation:
    def altitudeManipulation(planes: list[DT.Plane], changeRate: float):
        for i in range(len(planes)):
            planes[i].geo_altitude = planes[i].geo_altitude * changeRate / 100
        return planes
    
    def longtitudeManipulation(planes: list[DT.Plane], changeRate: float):
        for i in range(len(planes)):
            planes[i].longtitude = planes[i].longtitude * changeRate / 100
        return planes
    
    def latitudeManipulation(planes: list[DT.Plane], changeRate: float):
        for i in range(len(planes)):
            planes[i].latitude = planes[i].latitude * changeRate / 100
        return planes