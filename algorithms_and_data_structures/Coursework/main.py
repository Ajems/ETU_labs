from module.HashTable import HashTable
from module.RBTree import RBTree


def main():

    my_table = HashTable()
    for i in range(7670):
        my_table[str(i)] = str(i)

    for i in range(7670):
        print("remove {}".format(i))
        my_table.remove(str(i))

    print("ff")
    
if __name__ == '__main__':
    main()
