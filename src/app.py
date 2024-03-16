import DataManipulation
import FlightFetcher as ff

#get values from frontend
def changePlaneDataByBounds(min_latitude, max_latitude, min_longtitude, max_longtitude, changeRate1, changeRate2, changeRate3):
    planes = ff.getFlightsByBounds(min_latitude, max_latitude, min_longtitude, max_longtitude)
    DataManipulation.altitudeManipulation(planes, changeRate1)
    DataManipulation.longtitudeManipulation(planes, changeRate2)
    DataManipulation.latitudeManipulation(planes, changeRate3)

def main():
    #Create build classes for every component.
    #Create connection to API
    #load data
    #load UI
    #Create socket
    pass


if(__name__ == "__main__"):
    main()