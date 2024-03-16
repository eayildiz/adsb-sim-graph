import DataTypes as DT

def altitudeManipulation(planes: list[DT.Plane], changeRate: float):
    for i in range(len(planes)):
        planes[i].geo_altitude += planes[i].geo_altitude * changeRate / 100
    
def longtitudeManipulation(planes: list[DT.Plane], changeRate: float):
    for i in range(len(planes)):
        planes[i].longtitude += planes[i].longtitude * changeRate / 100
    
def latitudeManipulation(planes: list[DT.Plane], changeRate: float):
    for i in range(len(planes)):
        planes[i].latitude += planes[i].latitude * changeRate / 100
    
def changeData(planes: list[DT.Plane], changeRate1, changeRate2, changeRate3):
    if(changeRate1 != 0):
        planes = altitudeManipulation(planes, changeRate1)
    if(changeRate2 != 0):
        planes = latitudeManipulation(planes, changeRate2)
    if(changeRate3 != 0):
        planes = altitudeManipulation(planes, changeRate3)