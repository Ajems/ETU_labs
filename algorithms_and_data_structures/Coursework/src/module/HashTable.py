class HashTable:
    def __init__(self, probing="linear", fill_factor=0.75):
        if 0 < fill_factor < 1:
            self.fill_factor = fill_factor
        else:
            self.fill_factor = 0.75
        self.probing = probing
        self.__current_size = 16384
        self.__total_item = 0
        self.total_collision = 0
        self.__array = [(None, None) for _ in range(self.__current_size)]

    def __str__(self):
        return self.__array

    def __setitem__(self, key, value):
        # берем хэш от ключа mod размер
        hash_value = self.__hash(key) % self.__current_size
        iteration = 0
        offset = 0
        while True:
            # если на новом месте нет элемента - вставить
            if self.__array[(hash_value + offset) % self.__current_size][0] is None:
                # хранится хэш без округления
                self.__array[(hash_value + offset) % self.__current_size] = [key, value] # хранится пара (ключ - значение)
                break
            elif self.__array[(hash_value + offset) % self.__current_size][0] == key:
                self.__array[(hash_value + offset) % self.__current_size][1] = value
                break

            iteration+=1
            if self.probing == "linear":
                    offset = iteration # линейное пробирование
            elif self.probing == "square":
                    offset = iteration**2 # квадратичное пробирование
            elif self.probing == "double hashing":
                    offset = iteration*self.__hash_second(hash_value+offset)
            else:
                offset = iteration # по дефолту линейное

        self.__total_item+=1
        if self.__total_item >= self.fill_factor*self.__current_size:
            self.__resize()

        return None

    def __resize(self):
        new_array = [(None, None) for _ in range(self.__current_size*2)]
        old_array = self.__array
        old_size = self.__current_size
        self.__array = new_array
        self.__current_size*=2

        self.__total_item = 0
        self.total_collision = 0
        for index in range(old_size):
            if old_array[index][0] is not None: # найден элемент который надо скопировать в новую таблицу
                self.__setitem__(old_array[index][0], old_array[index][1])


    def __getitem__(self, key):
        hash_value = self.__hash(key) % self.__current_size
        iteration = 0
        offset = 0
        while True:
            # если на новом месте нет элемента - вставить
            if self.__array[(hash_value + offset) % self.__current_size][0] == key:
                return self.__array[(hash_value + offset) % self.__current_size][1]

            iteration += 1
            if iteration > self.__current_size:
                raise KeyError("No such key in hash-table!")

            if self.probing == "linear":
                offset = iteration  # линейное пробирование
            elif self.probing == "square":
                offset = iteration ** 2  # квадратичное пробирование
            elif self.probing == "double hashing":
                offset = iteration * self.__hash_second(hash_value + offset)
            else:
                offset = iteration  # по дефолту линейное

    def __str__(self):
        return str(self.__array)

    def remove(self, key):
        hash_value = self.__hash(key) % self.__current_size

        iteration = 0
        offset = 0
        while True:
            # если на новом месте нет элемента - вставить
            if self.__array[(hash_value + offset) % self.__current_size][0] == key:
                data = self.__array[(hash_value + offset) % self.__current_size][1]
                self.__array[(hash_value + offset) % self.__current_size] = (None, None)
                return data

            iteration += 1
            if iteration > self.__current_size:
                raise KeyError("No such key in hash-table!")

            if self.probing == "linear":
                offset = iteration  # линейное пробирование
            elif self.probing == "square":
                offset = iteration ** 2  # квадратичное пробирование
            elif self.probing == "double hashing":
                offset = iteration * self.__hash_second(key)
            else:
                offset = iteration  # по дефолту линейное


    def __hash(self, key, size = None):
        if size is None:
            size = self.__current_size
        hash_code = 0
        for i in range(len(key)):
            hash_code += (ord(key[-i-1]) * (19 ** i))
        return hash_code % size

    def __hash_second(self, key):
        x = 263
        tmp_sum = 0
        for k, element in enumerate(str(key)):
            x*= k
            tmp_sum = (ord(element) * x) % self.__current_size

        return (tmp_sum % (self.__current_size - 1)) + 1

    def find_collision(self):
        arr = []
        for i in self.__array:
            if i == (None, None): continue
            hc = self.__hash(i[0])
            if hc not in arr:
                arr.append(hc)
        return len(arr)


    def size(self):
        return self.__total_item
