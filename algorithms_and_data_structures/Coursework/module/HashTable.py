class HashTable:
    def __init__(self):
        self.__current_size = 10
        self.__total_item = 0
        self.__array = [(None, None) for _ in range(self.__current_size)]

    def __setitem__(self, key, value):
        # берем хэш от ключа mod размер
        hash_value = abs(hash(key))%self.__current_size
        i = 0
        while True:
            # если на новом месте нет элемента - вставить
            if self.__array[(hash_value + i ** 2) % self.__current_size][0] is None:
                self.__array[(hash_value + i ** 2) % self.__current_size] = (key, value)
                break
            i+=1 # следующий эл-т квадр. поиска

        self.__total_item+=1

        if self.__total_item >= 0.75*self.__current_size:
            print("resize because {} >= 0.75*{} = {}".format(self.__total_item, self.__current_size, 0.75*self.__current_size))
            # прибавить в массив стлько же None элементов в количестве размера таблицы
            # т.е. она станет в 2 раза больше
            self.__array += [(None, None) for _ in range(self.__current_size)]
            self.__current_size *= 2

        return None


    def __getitem__(self, key):
        hash_value = abs(hash(key)) % self.__current_size
        # TODO могут быть проблемы, если произошел ресайз после добавления элемента
        # для добавления его брался мод хэш по старому размеру
        # доабавили -> ресайз -> другой размер -> другой мод для поиска этого же элемента
        # вприницпе такая ошибка будет если делать хотя бы один ресайз, потому что все элт-ты
        # считались по старым размерам

        for i in range(self.__total_item):
            # print("Хэш для получения по {} = {}".format(key, (hash_value+i**2)%self.__current_size))
            # совпадение по ключу (i = 0 на первой итерации, смещения по поиску не было)
            if self.__array[(hash_value + i ** 2) % self.__current_size][0] == key:
                # вернуть значение по ключу
                return self.__array[(hash_value + i ** 2) % self.__current_size][1]

        raise KeyError("No such key in hash-table!")


    def remove(self, key):
        hash_value = abs(hash(key)) % self.__current_size
        print("removing {}".format(hash_value))
        # TODO same ошибка что и в поиске
        for i in range(self.__total_item):
            # print("Хэш для удаления по {} = {}".format(key, (hash_value+i**2)%self.__current_size))
            # совпадение по ключу (i = 0 на первой итерации, смещения по поиску не было)
            if self.__array[(hash_value + i ** 2) % self.__current_size][0] == key:
                data = self.__array[(hash_value + i ** 2) % self.__current_size][1]
                # сделать эл-т None
                self.__array[(hash_value + i ** 2) % self.__current_size] = (None, None)
                return data
            # else:
            #     print("{} !+ {}".format(key, (hash_value + i ** 2) % self.__current_size))
        raise KeyError("No such key in hash-table!")
