import DataManipulation as dm
import FlightFetcher as ff

#get values from frontend
def changePlaneDataByBounds(min_latitude, max_latitude, min_longtitude, max_longtitude, changeRate1, changeRate2, changeRate3):
    planes = ff.getFlightsByBounds(min_latitude, max_latitude, min_longtitude, max_longtitude)
    planes = dm.changeData(planes, changeRate1, changeRate2, changeRate3)

def changePlaneDataByBounds(min_latitude, max_latitude, min_longtitude, max_longtitude, changeRate1, changeRate2, changeRate3):
    planes = ff.getFlightsByBounds(min_latitude, max_latitude, min_longtitude, max_longtitude)
    planes = dm.changeData(planes, changeRate1, changeRate2, changeRate3)


def main():
    #Create build classes for every component.
    #Create connection to API
    #load data
    #load UI
    #Create socket
    pass


if(__name__ == "__main__"):
    main()