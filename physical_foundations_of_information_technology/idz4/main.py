import numpy as np
import matplotlib.pyplot as plt
from scipy.io.wavfile import write

filename = "signaldigit19.txt"
t = 3.75
signal_length = None
dt = None
F = None
H_array = []
w = []
C = 0.00005
R = 1000
U = 5


def dt():
    return t / signal_length

# импеданс конденцатор
def ZC(w, C):
    if 1j * w * C == 0:
        return np.inf
    return 1 / (1j * w * C)


def R_in(w):
    if ZC(w, C) == np.inf:
        return np.inf
    return R + ZC(w, C)


def I_in(w, U_in):
    return U_in / R_in(w)


def H(w, U_in): #
    U_out = I_in(w, U_in) * ZC(w, C)
    return U_out / U_in


def bytes_to_decimal(filename):
    discret_signal = np.loadtxt(filename, dtype=int)
    return [int(''.join(map(str, row)), 2) for row in discret_signal]


def scale(signal):
    return np.float32(np.real(signal) / np.max(np.abs(np.real(signal))) * 1.0)


def write_audio(filename, signal):
    write(f'{filename}.wav', 44100, (signal * 32767).astype(np.int16))


def show_signal(signal):
    time_axis = np.arange(0, t, dt)[:len(signal)]
    plt.plot(time_axis, signal)
    plt.xlabel('Time')
    plt.ylabel('Amplitude')
    plt.title('Signal')
    plt.show()


def show_input_spectre():
    a = [np.abs(i) * 2 / signal_length for i in F[1:]]
    w = [i * 2 * np.pi / t for i in range(signal_length)]
    plt.plot(w[:int(len(w) / 2)], a[:int(len(a) / 2)])
    plt.xlabel('w')
    plt.ylabel('A')
    plt.show()


def show_afc():
    plt.plot(w[:450], H_array[:450])
    plt.xlabel('Hz')
    plt.ylabel('H')
    plt.show()


def show_output_spectre():
    F_new = []
    for i in range(len(F) - 1):
        F_new.append(F[i + 1] * H_array[i + 1])
    A = [np.abs(i) * 2 / signal_length for i in F_new]
    plt.plot(w[:int(len(w) / 2)], A[:int(len(A) / 2)])
    plt.xlabel('w')
    plt.ylabel('A')
    plt.show()


def get_output_signal():
    F_new = []
    for i in range(len(F) - 1):
        F_new.append(F[i + 1] * H_array[i + 1])
    return np.fft.ifft(F_new)


if __name__ == '__main__':
    analog_signal = bytes_to_decimal(filename)

    signal_length = len(analog_signal)
    dt = dt()

    scaled_signal = scale(analog_signal)
    write_audio("original", scaled_signal)
    show_signal(analog_signal)

    F = np.fft.fft(analog_signal) # массив комплексных значений (точек)
    w = [i * 2 * np.pi / t for i in range(signal_length)] # массив частот
    H_array = [np.abs(H(w_elem, U)) for w_elem in w] # массив передаточной функции для каждой частоты

    show_input_spectre()
    show_afc()
    show_output_spectre()

    signal_out = get_output_signal()
    show_signal(signal_out)
    signal_out_scale = scale(signal_out)

    write_audio("changed_signal", signal_out_scale)