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

    # rb_tree = RBTree()
    # rb_tree.insert("down", "Yes, I'm!")
    # rb_tree.insert("down.", "No, I'm gay!")
    # # rb_tree.print_tree()
    # print(rb_tree.get("down"))
    # print()
    # rb_tree.remove("down")
    # # rb_tree.print_tree()




if __name__ == '__main__':
    main()