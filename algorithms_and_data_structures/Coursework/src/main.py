from module.HashTable import HashTable
from module.RBTree import RBTree
import matplotlib.pyplot as plt
import time


def main():
    times_linear_table = []
    file = open("times_linear_table.txt", "w")
    for iteration in range(1, 20000):
        if iteration % 100 == 0: print(iteration)
        table = HashTable(probing="linear")
        start = time.time()
        for key in range(iteration):
            table[str(key)] = key
        end = time.time() - start
        times_linear_table.append(end)
        file.write(str(end) + "\n")

    plt.scatter([i for i in range(1, 20000)], times_linear_table)
    plt.show()
    file.close()


if __name__ == '__main__':
    main()
