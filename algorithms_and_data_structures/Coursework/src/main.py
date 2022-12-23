import random

from module.HashTable import HashTable
from module.RBTree import RBTree
import matplotlib.pyplot as plt
import time


def main():
    times_linear_table = []
    times_square_table = []
    times_double_table = []
    file = open("times_linear_worst.txt", "w")
    table_ln = HashTable(probing="linear")
    table_sq = HashTable(probing="square")
    table_db = HashTable(probing="double hashing")

    dataset = list()
    for _ in range(10000):
        dataset.append(random.randint(1, 10000))

    for iteration in range(1, 10000):
        if iteration % 100 == 0: print(iteration)
        table_ln[str(dataset[iteration])] = iteration

    start = time.time()
    for iteration in range(10000, 1, -1):
        if iteration % 100 == 0: print(iteration)
        try:
            table_ln.remove(str(dataset[iteration]))
        except:
            pass
        end = time.time() - start
        times_linear_table.append(end)
        file.write(str(end) + "\n")

    for iteration in range(1, 10000):
        if iteration % 100 == 0: print(iteration)
        table_sq[str(dataset[iteration])] = iteration

    start = time.time()
    for iteration in range(10000, 1, -1):
        if iteration % 100 == 0: print(iteration)
        try:
            table_sq.remove(str(dataset[iteration]))
        except:
            pass
        end = time.time() - start
        times_square_table.append(end)
        file.write(str(end) + "\n")

    for iteration in range(1, 10000):
        if iteration % 100 == 0: print(iteration)
        table_db[str(dataset[iteration])] = iteration

    start = time.time()
    for iteration in range(10000, 1, -1):
        if iteration % 100 == 0: print(iteration)
        try:
            table_db.remove(str(dataset[iteration]))
        except:
            pass
        end = time.time() - start
        times_double_table.append(end)
        file.write(str(end) + "\n")

    fig, ax = plt.subplots()
    ax.set_xlabel("Total elements")
    ax.set_ylabel("Time (sec)")

    # for i in range (10000-len(times_linear_table)): times_linear_table.append(times_linear_table[len(times_linear_table)-1])
    # for i in range(10000 - len(times_square_table)): times_square_table.append(times_square_table[len(times_linear_table)-1])
    # for i in range(10000 - len(times_double_table)): times_double_table.append(times_double_table[len(times_linear_table)-1])
    print(len(times_linear_table))

    ax.scatter([i for i in range(1, 10000)], times_linear_table, s=2, color=['red'])
    ax.scatter([i for i in range(1, 10000)], times_square_table, s=2, color=['green'])
    ax.scatter([i for i in range(1, 10000)], times_double_table, s=2, color=['blue'])

    plt.show()
    file.close()


if __name__ == '__main__':
    main()
