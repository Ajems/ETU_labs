import matplotlib.pyplot as plt


def main():
    times_linear_table = []
    with open("times_linear_worst.txt", "r") as file:
        for line in file:
            times_linear_table.append(float(line))

    plt.scatter([i for i in range(1, 20000)], times_linear_table)
    plt.show()


if __name__ == '__main__':
    main()
