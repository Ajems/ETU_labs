from module.Node import Node
class MyRBTree:
    NULL = Node(0, None, 1)

    def __init__(self):
        self.root = self.NULL

    def insert(self, key, data):
        node = Node(key, data, 1, self.NULL, self.NULL, None)  # Set red root
        y = None
        x = self.root

        while x != self.NULL:  # Find position for new node
            y = x
            if node.val < x.val:
                x = x.left
            else:
                x = x.right

        node.parent = y  # Set parent of Node as y
        # set child for node
        if y is None:  # If parent None, then it is root node
            self.root = node
        elif node.val < y.val:  # Check if it is right Node or Left Node by checking the value
            y.left = node
        else:
            y.right = node

        if node.parent is None:  # Root node is always Black
            node.color = 0
            return

        if node.parent.parent is None:  # If parent of node is Root Node
            return

        self.__fixNodeInsert__(node)  # Else call for Fix Up


    def __fixNodeInsert__(self, node):
        while node.parent.color == 1:  # While parent is red
            if node.parent == node.parent.parent.right:  # if parent is right child of its parent
                uncle = node.parent.parent.left  # Left child of grandparent
                if uncle.color == 1:  # if color of left child of grandparent i.e, uncle node is red
                    uncle.color = 0  # Set both children of grandparent node as black
                    node.parent.color = 0
                    node.parent.parent.color = 1  # Set grandparent node as Red
                    node = node.parent.parent  # Repeat the algo with Parent node to check conflicts
                else:
                    if node == node.parent.left:  # If k is left child of it's parent
                        node = node.parent
                        self.RR(node)  # Call for right rotation
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    self.LR(node.parent.parent)
            else:  # if parent is left child of its parent
                uncle = node.parent.parent.right  # Right child of grandparent
                if uncle.color == 1:  # if color of right child of grandparent i.e, uncle node is red
                    uncle.color = 0  # Set color of child as black
                    node.parent.color = 0
                    node.parent.parent.color = 1  # set color of grandparent as Red
                    node = node.parent.parent  # Repeat algo on grandparent to remove conflicts
                else:
                    if node == node.parent.right:  # if k is right child of its parent
                        node = node.parent
                        self.LR(node)  # Call left rotate on parent of k
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    self.RR(node.parent.parent)  # Call right rotate on grandparent
            if node == self.root:  # If k reaches root then break
                break
        self.root.color = 0  # Set color of root as black


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

    def remove(self, key):
        hashed_key = hash(key)
        print("Hashed key is {}".format(hashed_key))
        current_node = self.root
        node_delete = None
        if current_node == self.NULL:
            print("Node with {0} key doesn't exist. Tree is empty".format(key))
            return
        # найти элемент для удаления
        while current_node:
            if current_node.key == key: #current_node.val == hashed_key было необязательным
                node_delete = current_node
            if current_node.val > hashed_key:
                current_node = current_node.left
            else:
                current_node = current_node.right

        # элемента нет в дереве
        if node_delete is None:
            print("Node with {0} key doesn't exist. Tree is empty".format(key))
            return

        # процесс удаления
        print("Element found key = {}, hashed key = {}, data = {}".format(node_delete.key, node_delete.val, node_delete.data))

        if node_delete.left is None and node_delete.right is None: # детей нет, надо удалить и занулить себя
            print("Я конченый (конечный) элемент, смой меня нахуй")
            # просто удалить
            if node_delete.parent.left == node_delete:
                node_delete.parent.left = None
            else:
                node_delete.parent.right = None
            node_delete.parent = None
        # значит либо 1 либо 2 ребенка, рассмотрим ситуации с одним ребенком
        # на место удаленного элемента надо поставить его ребенка, установить связи
        # пофиксить цвета
        elif node_delete.left is None: # нет левого ребенка -> есть правый
            print("нет левого ребенка -> есть правый")
            node_delete.right.parent = node_delete.parent
            if node_delete.parent.left == node_delete: # нода - левый ребенок
                node_delete.parent.left = node_delete.right
                node_delete.right = None
            else: # нода - правый ребенок
                node_delete.parent.right = node_delete.right
                node_delete.right = None
            node_delete.parent = None
        elif node_delete.right is None: # есть только левый ребенок
            print("есть только левый ребенок")
            node_delete.left.parent = node_delete.parent
            if node_delete.parent.left == node_delete:  # нода - левый ребенок
                node_delete.parent.left = node_delete.left # ребенок и родитель связаны
                node_delete.left = None
            else:  # нода - правый ребенок
                node_delete.parent.right = node_delete.left
                node_delete.left = None
            node_delete.parent = None
        # значит оба ребенка есть
        else:
            print("значит оба ребенка есть right data {}, left data {}".format(node_delete.right.data, node_delete.left.data))
            # надо взять минимальный элемент в правом поддереве
            # поменяться с ним данными
            # удалить этот элемент с данными удаляемого элемента
            tmp_node: Node = self.minimum(node_delete.right)
            self.swap_node(node_delete, tmp_node)
            # у него нет детей, т.к. он конечный и он левый т.к. минимальный
            # но может оказаться, что он правый, если это правый ребенок удаляемого эл-та
            color = tmp_node.color
            if node_delete.right == tmp_node:
                node_delete.right = tmp_node.right
            else:
                tmp_node.parent.left = tmp_node.right
            tmp_node.right.parent = tmp_node.parent
            tmp_node.right = None
            tmp_node.parent = None

            if color == 0:  # нарушение свойства может быть только если цвет удаляемого черный
                            # так как при удалении красного черная глубина не меняется
                self.fix_remove(tmp_node)

    def fix_remove(self, tmp_node: Node):
        while tmp_node.color == 0 and tmp_node.parent is not None:
            if tmp_node.parent.left == tmp_node:
                if tmp_node.parent.right.color == 1: # если брат красный
                    tmp_node.parent.color = 1 # отец - красный
                    tmp_node.parent.right.color = 0 # брат черный
                    self.LR(tmp_node.parent)
                # Оба ребёнка у брата чёрные
                if (tmp_node.parent.right.left is not None) and (tmp_node.parent.right.left.color == 0) and (tmp_node.parent.right.right is not None) and (tmp_node.parent.right.right.color == 0):
                    tmp_node.parent.right.color = 1
                    tmp_node.parent.color = 0
                #Если у брата правый ребёнок чёрный, а левый красный
                elif (tmp_node.parent.right.left is not None) and (tmp_node.parent.right.left.color == 1) and (tmp_node.parent.right.right is not None) and (tmp_node.parent.right.right.color == 0):
                    tmp_node.parent.right.left.color = 0
                    tmp_node.parent.right.color = 1 # мб просто перекрасить а не красный
                    self.RR(tmp_node.parent.right)
                elif tmp_node.parent.right.right.color == 1: #Если у брата правый ребёнок красный
                    tmp_node.parent.right.color = tmp_node.parent.color # перекрашиваем брата в цвет отца
                    tmp_node.parent.right.right.color = 0
                    tmp_node.color = 0
                    self.LR(tmp_node.parent)
                    tmp_node = self.root
            else: # tmp_node - правый
                if tmp_node.parent.left.color == 1:
                    tmp_node.parent.left.color = 0
                    tmp_node.parent.color = 1
                    self.RR(tmp_node.parent)
                # Оба ребёнка у брата чёрные
                if (tmp_node.parent.left.left is not None) and (tmp_node.parent.left.left.color == 0) and (tmp_node.parent.left.right is not None) and (tmp_node.parent.left.right.color == 0):
                    tmp_node.parent.left.color = 1
                    tmp_node.parent.color = 0
                #Если у брата левый ребёнок чёрный, а левый красный
                elif (tmp_node.parent.left.left is not None) and (tmp_node.parent.left.left.color == 0) and (tmp_node.parent.left.right is not None) and (tmp_node.parent.left.right.color == 1):
                    tmp_node.parent.left.right.color = 0
                    tmp_node.parent.left.color = 1 # мб просто перекрасить а не красный
                    self.LR(tmp_node.parent.left)
                elif tmp_node.parent.left.left is not None and tmp_node.parent.left.left.color == 1: #Если у брата левый ребёнок красный
                    tmp_node.parent.left.color = tmp_node.parent.color # перекрашиваем брата в цвет отца
                    tmp_node.parent.left.left.color = 0
                    tmp_node.color = 0
                    self.RR(tmp_node.parent)
                    tmp_node = self.root
        tmp_node.color = 0
        self.root.color = 0


    def get(self, key):
        hashed_key = hash(key)
        current_node = self.root
        while current_node:
            if current_node.key == key:
                return current_node.data
            if current_node.val > hashed_key:
                current_node = current_node.left
            else:
                current_node = current_node.right
        print("Node with {0} key doesn't exist. Tree is empty".format(key))

    def swap_node(self, node_1: Node, node_2: Node, change_color = False):
        node_1.val, node_2.val = node_2.val, node_1.val
        node_1.key, node_2.key = node_2.key, node_1.key
        node_1.data, node_2.data = node_2.data, node_1.data
        if change_color:
            node_1.color, node_2.color = node_2.color, node_1.color

    def minimum(self, node):
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

    def print ( self ) :
        self.__printCall ( self.root , "" , True )

    def __printCall ( self , node , indent , last ) :
        if node != self.NULL :
            print(indent, end=' ')
            if last :
                print ("R----",end= ' ')
                indent += "     "
            else :
                print("L----",end=' ')
                indent += " |    "

            s_color = "RED" if node.color == 1 else "BLACK"
            print ( str ( node.data ) + " (" + s_color + ") " + "hash is " + str(node.val) )
            self.__printCall ( node.left , indent , False )
            self.__printCall ( node.right , indent , True )