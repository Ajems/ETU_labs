import queue


class Table:
    def __init__(self, size):
        self.__size = size
        self.__table = [[0] * self.__size for _ in range(self.__size)]
        self.__freeSquare = self.__size * self.__size
        self.__amountSquare = 0
        self.__squarePlaces = []

    def insertSquare(self, sqSize, xCoord, yCoord, insert=True):
        if sqSize >= self.__size: return False
        if (xCoord + sqSize - 1) > self.__size or (yCoord + sqSize - 1) > self.__size: return False

        for row in range(xCoord - 1, xCoord + sqSize - 1):
            for column in range(yCoord - 1, yCoord + sqSize - 1):
                if self.__table[row][column] == 1:
                    return False

        if insert:
            for row in range(yCoord - 1, yCoord + sqSize - 1):
                for column in range(xCoord - 1, xCoord + sqSize - 1):
                    print(str(row) + " " + str(column))
                    self.__table[row][column] = 1
                    print(self)
                    print()
            self.__freeSquare -= sqSize * sqSize
            self.__amountSquare += 1
            self.__squarePlaces.append([yCoord, xCoord, sqSize])
        return True

    def __str__(self):
        view = ""
        for r in range(self.__size):
            for c in range(self.__size):
                view += str(self.__table[r][c]) + " "
            view += "\n"
        return view

    def isFull(self): return self.__freeSquare == 0

    def amountSquare(self): return self.__amountSquare

    def dataDisplay(self):
        result = str(self.__amountSquare)+'\n'
        for i in self.__squarePlaces:
            result += " ".join(str(elem) for elem in i)+'\n'
        return result


t = Table(int(input()))  # создание доски
t.insertSquare(3, 1, 1)
t.insertSquare(2, 4, 4)
t.insertSquare(2, 4, 1)

print(t.dataDisplay())

solutions = []  # частичные решения
q = queue.Queue()  # очередь
q.put(t)

currentTable = t
while not q.empty():
    currentTable = q.get()
    if currentTable.isFull:
        print("Решение с {} квадратов найдено".format(currentTable.amountSquare))
        print(currentTable)
        solutions.append(currentTable)
    else:
        # попытаться вставить другие
        pass