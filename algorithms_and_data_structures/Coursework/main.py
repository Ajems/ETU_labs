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
    for i in range(100000):
        rb_tree.insertNode(str(i))
    cnt = 0

    try:
        for i in range(99905):
            rb_tree.delete_node(str(i))
            cnt+=1
    except:
        print("Удалилось {}".format(cnt))


    rb_tree.print_tree()




if __name__ == '__main__':
    main()