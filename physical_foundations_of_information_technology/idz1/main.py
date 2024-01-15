# Коренев Данил 1303 вариант 19
from math import cos
from math import sin
from math import asin
from math import radians
from math import tan
from math import pi
import matplotlib.pyplot as plt
import numpy as np

# график
plt.figure(figsize=(8, 3))
plt.xlim(-2, 17)
plt.ylim(-2, 2)
plt.xlabel("Z")
plt.ylabel("R")

# границы оптоволокна
plt.plot([0, 9.6545], [-1.8, -1.8], color='blue')
plt.plot([0, 14.34], [1.8, 1.8], color='blue')
plt.plot([0, 0], [-1.8, 1.8], color='blue')
plt.yticks([-1.8, 0, 1.8], ['-1.8', '0', '1.8'])

# оси
plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.annotate('', xy=(16, 0), xytext=(15, 0), arrowprops=dict(arrowstyle='->', color='black'))
plt.scatter(15.8, 0, s=0.1)
plt.annotate('', xy=(0, 3), xytext=(0, 2), arrowprops=dict(arrowstyle='->', color='black'))
plt.axis('equal')

# луч
plt.plot([-2, 0], [0.5 + tan(radians(42)) * (-2), 0.5], color='green', linewidth=2)

# config
R = 1.8
n2 = 1
f1 = lambda y: 1.4 + 0.3 * cos(0.8 * y ** 4)
Zf1 = lambda y: 12 + 3 * sin(17.951958020513104 * y)
n1 = lambda y, w: f1(y) * (1 - ((0.35 * 10 ** 14) / w) ** 2)
w = 3.4 * 10 ** 14
y0 = 0.5
alpha = 42
hop = 0.000001
length = 0
direction = 1 if alpha > 0 else -1

# правая граница
Yarray = np.linspace(-1.8, 1.8, 100000)
Zarray = [Zf1(v) for v in Yarray]
plt.plot(Zarray, Yarray, color="blue")


def angleRefeaction(a, nextN, curN):
    if (sin(a) * curN) / nextN > 1:
        global direction
        direction *= -1
        return a
    return asin((sin(a) * curN) / nextN)


def calc():
    global length
    global direction
    n1Input = n1(y0, w)
    curAng = angleRefeaction(radians(alpha), n1Input, n2)
    curAng = pi / 2 - curAng

    Yvalye = []
    Zvalue = []
    curY = y0
    curZ = 0
    curN = n1Input

    while curZ < Zf1(curY):
        Yvalye.append(curY)
        Zvalue.append(curZ)

        nextY = curY + cos(curAng) * hop * direction
        nextZ = curZ + abs(sin(curAng)) * hop
        if R >= abs(nextY):
            nextN = n1(nextY, w)
        else:
            nextN = n2

        nextAng = angleRefeaction(curAng, nextN, curN)
        length += hop

        curY = nextY
        curZ = nextZ
        curAng = nextAng
        curN = nextN

    plt.plot(Zvalue, Yvalye, color="red")


if __name__ == '__main__':
    calc()
    print("Длина траектории луча: ", length)
    plt.show()
