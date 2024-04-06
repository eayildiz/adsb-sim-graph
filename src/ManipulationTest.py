from DataManipulation import *
from DataTypes import Plane
import pytest

class TestLongitudeManipulation:
    def test_always_manipulates_correctly(self):
        planes = [Plane(plane_code="abc123", latitude=0, longitude=100)]
        rate = 10
        longitudeManipulation(planes, rate)
        assert planes[0].longitude == 110

    def test_planes_are_none(self):
        with pytest.raises(TypeError):
            planes = None
            rate = 10
            longitudeManipulation(planes, rate)

    def test_planes_are_empty(self):
        planes = []
        rate = 5
        longitudeManipulation(planes, rate)
        assert len(planes) == 0

class TestLatitudeManipulation:
    def test_always_manipulates_correctly(self):
        planes = [Plane(plane_code="abc123", latitude=50, longitude=0)]
        rate = 10
        latitudeManipulation(planes, rate)
        assert planes[0].latitude == 55

    def test_planes_are_none(self):
        with pytest.raises(TypeError):
            planes = None
            rate = 10
            latitudeManipulation(planes, rate)

    def test_planes_are_empty(self):
        planes = []
        rate = 5
        latitudeManipulation(planes, rate)
        assert len(planes) == 0        
