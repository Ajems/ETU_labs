from module.Node import Node
class RBTree:
    NULL = Node(0, None, 1)

    def __init__(self):
        self.root = self.NULL

    def insert(self, key, data):
        node_new = Node(key, data, 1, self.NULL, self.NULL, None)
        tmp_node = None
        node = self.root

        while node != self.NULL:  # поиск места вставки
            tmp_node = node
            if node_new.val < node.val:
                node = node.left
            else:
                node = node.right

        node_new.parent = tmp_node  # tmp_node родитель вставляемого элемента
        # установить связи между узлами
        if tmp_node is None:
            self.root = node_new
        elif node_new.val < tmp_node.val:
            tmp_node.left = node_new
        else:
            tmp_node.right = node_new

        if node_new.parent is None:  # если вставили в корень, покрасить в черный
            node_new.color = 0
            return

        if node_new.parent.parent is None:  # если первый ребенка корня, выход
            return

        self.__fix_node_insert__(node_new)  # фиксить вставку


    def __fix_node_insert__(self, node):
        while node.parent.color == 1:  # пока родитель красный надо фиксить
            if node.parent == node.parent.parent.right:  # родитель ноды - правый
                uncle = node.parent.parent.left  # найти дядю (левый ребенок деда)
                if uncle.color == 1:  # ситуация, когда дядя - красный -> надо все перекрасить
                    uncle.color = 0  # дядя -> черный, родитель -> черный, дед -> красный
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    node = node.parent.parent  # подняться на уровень деда и продолжить цикл
                else: # если дядя черный
                    if node == node.parent.left:  # ребенок - левый
                        node = node.parent # переключиться на родителя
                        self.RR(node)  # правый поворот относительно родителя
                    node.parent.color = 0 # отец (вставляемый элемент) -> черный
                    node.parent.parent.color = 1 # дед (отец вставляемого) -> красный
                    self.LR(node.parent.parent) # левый поворот от деда (отца вставляемого)
            else: # все аналогично, но симметрично
                uncle = node.parent.parent.right
                if uncle.color == 1:
                    uncle.color = 0
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    node = node.parent.parent
                else:
                    if node == node.parent.right:
                        node = node.parent
                        self.LR(node)
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    self.RR(node.parent.parent)
            if node == self.root: # добрались до корня -> все дерево пофикшено -> выход
                break
        self.root.color = 0 # корень всегда черный


    def LR(self, node):
        tmp = node.right
        node.right = tmp.left
        if tmp.left != self.NULL:
            tmp.left.parent = node

        tmp.parent = node.parent
        if node.parent is None:
            self.root = tmp
        elif node == node.parent.left:
            node.parent.left = tmp
        else:
            node.parent.right = tmp
        tmp.left = node
        node.parent = tmp

    def RR(self, node):
        tmp = node.left
        node.left = tmp.right
        if tmp.right != self.NULL:
            tmp.right.parent = node

        tmp.parent = node.parent
        if node.parent is None:
            self.root = tmp
        elif node == node.parent.right:
            node.parent.right = tmp
        else:
            node.parent.left = tmp
        tmp.right = node
        node.parent = tmp

    def delete(self, key):
        self.__remove(self.root, key)

    def __remove(self, node, key):
        tmp_node = self.NULL
        hashed_key = Node.hash_key(key)
        while node != self.NULL:
            if node.key == key:
                tmp_node = node
            if node.val <= hashed_key:
                node = node.right
            else:
                node = node.left
        if tmp_node == self.NULL:
            raise KeyError("Node with {} key doesn't exist".format(key))

        contain_node = tmp_node
        contain_color = contain_node.color
        if tmp_node.left == self.NULL:
            child_node = tmp_node.right
            self.__transplant(tmp_node, tmp_node.right)
        elif tmp_node.right == self.NULL:
            child_node = tmp_node.left
            self.__transplant(tmp_node, tmp_node.left)
        else:
            contain_node = self.minimum(tmp_node.right)
            contain_color = contain_node.color
            child_node = contain_node.right
            if contain_node.parent == tmp_node:
                child_node.parent = contain_node
            else:
                self.__transplant(contain_node, contain_node.right)
                contain_node.right = tmp_node.right
                contain_node.right.parent = contain_node
            self.__transplant(tmp_node, contain_node)
            contain_node.left = tmp_node.left
            contain_node.right.parent = contain_node
            contain_node.color = tmp_node.color
        if contain_color == 0:
            self.__fix_remove__(child_node)

    def __transplant(self, node_1, node_2):
        if node_1.parent is None:
            self.root = node_2
        elif node_1 == node_1.parent.left:
            node_1.parent.left = node_2
        else:
            node_1.parent.right = node_2
        node_2.parent = node_1.parent

    def __fix_remove__(self, tmp_node: Node):
        while tmp_node != self.root and tmp_node.color == 0:  # узел не корень и черный
            if tmp_node == tmp_node.parent.left: # узел левый ребенок
                contain_node = tmp_node.parent.right  # брат узла
                if contain_node.color == 1:  # брат красный
                    contain_node.color = 0  # брат -> черный
                    tmp_node.parent.color = 1  # родитель -> красный
                    self.LR(tmp_node.parent)  # левый поворот относительно родителя
                    contain_node = tmp_node.parent.right # указывает на бывшего отца, но теперь ребенка узла
                if contain_node.left.color == 0 and contain_node.right.color == 0: # оба ребенка красные
                    contain_node.color = 1  # сделать узел красным
                    tmp_node = tmp_node.parent # сместить узел на родителя
                else:
                    if contain_node.right.color == 0:  # правый ребенок черный
                        contain_node.left.color = 0  # левый ребенок -> черный
                        contain_node.color = 1  # сохранение красного
                        self.RR(contain_node)  # правый поворот
                        contain_node = tmp_node.parent.right # запомнить родителя узла

                    contain_node.color = tmp_node.parent.color # запомнить цвет родителя
                    tmp_node.parent.color = 0  # установить цвет родителя черным
                    contain_node.right.color = 0 # установить цвет правого ребенка запомнившегося узла черным
                    self.LR(tmp_node.parent)  # левый поворот от родителя узла
                    tmp_node = self.root # дерево сбалансировано, цикл закончится
            else: # аналогично, но инвертировано
                contain_node = tmp_node.parent.left
                if contain_node.color == 1:
                    contain_node.color = 0
                    tmp_node.parent.color = 1
                    self.RR(tmp_node.parent)
                    contain_node = tmp_node.parent.left
                if contain_node.right.color == 0 and contain_node.right.color == 0:
                    contain_node.color = 1
                    tmp_node = tmp_node.parent
                else:
                    if contain_node.left.color == 0:
                        contain_node.right.color = 0
                        contain_node.color = 1
                        self.LR(contain_node)
                        contain_node = tmp_node.parent.left

                    contain_node.color = tmp_node.parent.color
                    tmp_node.parent.color = 0
                    contain_node.left.color = 0
                    self.RR(tmp_node.parent)
                    tmp_node = self.root
        tmp_node.color = 0


    def get(self, key):
        hashed_key = Node.hash_key(key)
        current_node = self.root
        while current_node:
            if current_node.key == key:
                return current_node.data
            if current_node.val > hashed_key:
                current_node = current_node.left
            else:
                current_node = current_node.right
        raise KeyError("Node with {0} key doesn't exist. Tree is empty".format(key))

    def minimum(self, node) -> Node:
        while node.left != self.NULL:
            node = node.left
        return node

    def max(self):
        node = self.root
        while node.right != self.NULL:
            node = node.right
        return node.data

    def min(self):
        node = self.root
        while node.left != self.NULL:
            node = node.left
        return node.data

    def print(self) :
        self.__print_node (self.root, "", True)

    def __print_node (self, node, indent, last) :
        if node != self.NULL :
            print(indent, end=' ')
            if last :
                print ("R----",end= ' ')
                indent += "     "
            else :
                print("L----",end=' ')
                indent += " |    "

            s_color = "RED" if node.color == 1 else "BLACK"
            print ("Key <" + str(node.key) + "> data <" + str(node.data) + "> (" + s_color + ") " + "hash <" + str(node.val) + ">")
            self.__print_node (node.left, indent, False)
            self.__print_node (node.right, indent, True)