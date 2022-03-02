class HouseScheme:

    def __init__(self, rooms, square, bathroom):
        if isinstance(rooms, int) and rooms > 0 and isinstance(square, int) and square > 0 and isinstance(bathroom, bool):
            self.rooms = rooms
            self.square = square
            self.bathroom = bathroom
        else:
            raise ValueError ("Invalid value")


class CountryHouse(HouseScheme):

    def __init__(self, rooms, square, bathroom, floors, area):
        if isinstance(floors, int) and floors > 0 and isinstance(area, int) and area > 0:
            super().__init__(rooms, square, bathroom)
            self.floors = floors
            self.area = area
        else:
            raise ValueError ("Invalid value")

    def __str__(self):
        return "Country House: Количество жилых комнат {}, Жилая площадь {}, Совмещенный санузел {}, Количество этажей {}, Площадь участка {}.".format(self.rooms, self.square, self.bathroom, self.floors, self.area)

    def __eq__(self, other):
        if isinstance(other, CountryHouse):
            if self.square == other.square and self.area == other.area and abs(self.floors - other.floors) <= 1:
                return True
            else:
                return False
        else:
            return False

class Apartment(HouseScheme):
    
    def __init__(self, rooms, square, bathroom, floors, window_view):
        if isinstance(floors, int) and (1 <= floors <= 15) and isinstance(window_view, str) and (window_view in ['N', 'S', 'W', 'E']):
            super().__init__(rooms, square, bathroom)
            self.floors = floors
            self.window_view = window_view
        else:
            raise ValueError ("Invalid value")

    def __str__(self):
        return "Apartment: Количество жилых комнат {}, Жилая площадь {}, Совмещенный санузел {}, Этаж {}, Окна выходят на {}.".format(self.rooms, self.square, self.bathroom, self.floors, self.window_view)


class CountryHouseList(list):
    def __init__(self, name):
        super().__init__()
        self.name = name

    def append(self, p_object):
        if isinstance(p_object, CountryHouse):
            super().append(p_object)
        else:
            raise TypeError("Invalid type {}".format(type(p_object)))

    def total_square(self):
        return sum(element.square for element in self)

class ApartmentList(list):


    def __init__(self, name):
        super().__init__()
        self.name = name

    def extend(self, iterable):
        for element in iterable:
            if isinstance(element, Apartment):
                super().append(element)

    def floor_view(self, floors, directions):
        ans = list(filter(lambda element: (floors[0] <= element.floors <= floors[1]) and (element.window_view in directions), self))
        for i in ans:
            print(str(i.window_view)+": "+str(i.floors))