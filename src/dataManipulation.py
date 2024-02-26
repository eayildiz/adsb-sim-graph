import DataTypes as DT

class dataManipulation:
    def altitudeManipulation(planes: list[DT.Plane], altitude: float, changeRate: float):
        for i in range(len(planes)):
            planes[i].altitude = planes[i].altitude * changeRate
        return planes
    
    def longtitudeManipulation(planes: list[DT.Plane], longtitude: float, changeRate: float):
        for i in range(len(planes)):
            planes[i].longtitude = planes[i].longtitude * changeRate
        return planes
    
    def heightManipulation(planes: list[DT.Plane], height: float, changeRate: float):
        for i in range(len(planes)):
            planes[i].height = planes[i].height * changeRate
        return planes