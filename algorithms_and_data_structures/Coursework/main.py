from module.HashTable import HashTable
from module.RBTree import RBTree
from module.OneMoreRBTree import RBTree as OneMoreRBTree
from module.MyRBTree import MyRBTree
import time


def main():

    # print("start hash table")
    #
    # my_table = HashTable()
    # start = time.time()
    # for i in range(10000):
    #     my_table[str(i)] = str(i)
    # end = time.time() - start
    # print("Adding elements to hash table: {}".format(end))
    #
    # start = time.time()
    # for i in range(10000):
    #     my_table.remove(str(i))
    # end = time.time() - start
    # print("Removing elements to hash table: {}".format(end))
    #
    # print("end table")


    rb_tree = OneMoreRBTree()
    start = time.time()
    for i in range(10000):
        #print(i)
        rb_tree.insertNode(str(i))
        #rb_tree.print()
        #print()
    end = time.time() - start

    #rb_tree.print()
    #print()

    for i in range (9800):
        rb_tree.delete_node(str(i))
    rb_tree.print_tree()



    #rb_tree.remove(34)
    #rb_tree.remove(str(24))

    #start = time.time()
    #cnt = 0
    #try:
    #    for i in range(10000):
    #        rb_tree.remove(str(i))
    #        cnt+=1
    #except:
    #    print("Ошибка блин")
    #end = time.time() - start
    #print("Удалось удалить {} элементов".format(cnt))
    #print("Removing elements from tree table: {}".format(end))
    #rb_tree.print_tree()




if __name__ == '__main__':
    main()