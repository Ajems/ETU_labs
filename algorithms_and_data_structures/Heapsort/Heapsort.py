from math import floor
from math import log2

class Array:
    __array__ = []
    __size__ = 0
    __deep__ = 0
    def __init__(self, array=None):
        if array is None:
            array = []
        self.__array__ = array
        self.__size__ = len(self.__array__)
        self.__deep__ = floor(log2(self.__size__+1))

    def sort(self):
        for index in range(2**(self.__deep__ - 1)-2, -1, -1):
            self.heapify(index)


    def heapify(self, index):
        maxElement = index
        left = index*2+1
        right = index*2+2

        if left < self.__size__ and self.__array__[left] > self.__array__[maxElement]:
            maxElement = left

        if right < self.__size__ and self.__array__[right] > self.__array__[maxElement]:
            maxElement = right

        if maxElement != index:
            self.__array__[index], self.__array__[maxElement] = self.__array__[maxElement], self.__array__[index]
            self.heapify(maxElement)

    def __setitem__(self, key, value):
        return self.__array__[key]

    def __str__(self):
        return " ".join(map(str, self.__array__))


def main():
    array = Array([0, 6, 2, 5, 1, 4, 2, 5, -1, 4, 12, 11, 4, 9, 8])
    array.sort()
    print(array)
    return 0

if __name__ == "__main__":
    main()