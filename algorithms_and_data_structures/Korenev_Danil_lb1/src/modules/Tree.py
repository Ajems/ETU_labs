class Tree:
    __data__ = list()
    __length__ = 0

    def __init__(self, data, length):
        self.__data__ = data
        self.__length__ = length

    def getHeight(self):
        if self.__length__ < 0:
            raise ValueError("Length value must be greater then 0")
        if self.__length__ == 0:
            return 0
        nodes = dict()

        for index in range(self.__length__):
            treeHeight = 1
            currentNode = self.__data__[index]
            while currentNode != -1:
                if currentNode in nodes:
                    treeHeight += nodes[currentNode]
                    break
                else:
                    currentNode = self.__data__[currentNode]
                    treeHeight += 1
            nodes[index] = treeHeight

        return max(nodes.values())
