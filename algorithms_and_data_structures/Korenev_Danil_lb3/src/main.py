# python
class processor:
    __load__ = 0

    def __init__(self, index):
        self.__index__ = index

    def __str__(self):
        return str(self.__index__) + " " + str(self.__load__)

    def __lt__(self, obj):
        if self.load() == obj.load():
            return self.index() < obj.index()
        return self.load() < obj.load()

    def increase(self, load):
        self.__load__ += load

    def load(self):
        return self.__load__

    def index(self):
        return self.__index__


class queuePriority:
    log = []
    def __init__(self, queue):
        self.__queue__ = queue

    def increaseMaxPriorityElement(self, value):
        self.log.append(str(self.__queue__[0]))
        self.__queue__[0].increase(value)
        self.move(0)

    def logging(self):
        return self.log

    def move(self, parentIndex):
        if parentIndex >= len(self.__queue__): return
        childIndexLeft = parentIndex*2+1
        childIndexRight = parentIndex*2+2
        childIndexMin = parentIndex
        if childIndexLeft < len(self.__queue__) and self.__queue__[childIndexLeft] < self.__queue__[parentIndex]:
            childIndexMin = childIndexLeft
        if childIndexRight < len(self.__queue__) and self.__queue__[childIndexRight] < self.__queue__[childIndexMin]:
            childIndexMin = childIndexRight
        if parentIndex != childIndexMin:
            self.__queue__[parentIndex], self.__queue__[childIndexMin] = self.__queue__[childIndexMin], self.__queue__[parentIndex]
            self.move(childIndexMin)



def runtime(cpuAndTask, loadData):
    cpu, task = map(int, cpuAndTask.split(" "))
    load = list(map(int, loadData.split(" ")))

    arr = [processor(i) for i in range(cpu)]
    queue = queuePriority(arr)

    for curLoad in load:
        queue.increaseMaxPriorityElement(curLoad)
    return queue.logging()


def main():
    for x in runtime(input(), input()):
        print(x)


if __name__ == "__main__":
    main()
