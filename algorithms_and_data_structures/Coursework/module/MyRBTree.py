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

    def delete(self, key):
        self.remove(self.root, key)

    def remove(self, node, key):
        tmp_node = self.NULL
        hashed_key = hash(key)
        while node != self.NULL:
            if node.key == key:
                tmp_node = node
            if node.val <= hashed_key:
                node = node.right
            else:
                node = node.left
        if tmp_node == self.NULL:
            print("Node with {} key doesn't exist".format(key))

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
            self.fix_remove(child_node)

    def __transplant(self, node_1, node_2):
        if node_1.parent is None:
            self.root = node_2
        elif node_1 == node_1.parent.left:
            node_1.parent.left = node_2
        else:
            node_1.parent.right = node_2
        node_2.parent = node_1.parent

    def fix_remove(self, tmp_node: Node):
        while tmp_node != self.root and tmp_node.color == 0:  # Repeat until tmp_node reaches nodes and color of tmp_node is black
            if tmp_node == tmp_node.parent.left:  # If tmp_node is left child of its parent
                contain_node = tmp_node.parent.right  # Sibling of tmp_node
                if contain_node.color == 1:  # if sibling is red
                    contain_node.color = 0  # Set its color to black
                    tmp_node.parent.color = 1  # Make its parent red
                    self.LR(tmp_node.parent)  # Call for left rotate on parent of tmp_node
                    contain_node = tmp_node.parent.right
                # If both the child are black
                if contain_node.left.color == 0 and contain_node.right.color == 0:
                    contain_node.color = 1  # Set color of contain_node as red
                    tmp_node = tmp_node.parent
                else:
                    if contain_node.right.color == 0:  # If right child of contain_node is black
                        contain_node.left.color = 0  # set left child of contain_node as black
                        contain_node.color = 1  # set color of contain_node as red
                        self.RR(contain_node)  # call right rotation on tmp_node
                        contain_node = tmp_node.parent.right

                    contain_node.color = tmp_node.parent.color
                    tmp_node.parent.color = 0  # Set parent of tmp_node as black
                    contain_node.right.color = 0
                    self.LR(tmp_node.parent)  # call left rotation on parent of tmp_node
                    tmp_node = self.root
            else:  # If tmp_node is right child of its parent
                contain_node = tmp_node.parent.left  # Sibling of tmp_node
                if contain_node.color == 1:  # if sibling is red
                    contain_node.color = 0  # Set its color to black
                    tmp_node.parent.color = 1  # Make its parent red
                    self.RR(tmp_node.parent)  # Call for right rotate on parent of tmp_node
                    contain_node = tmp_node.parent.left

                if contain_node.right.color == 0 and contain_node.right.color == 0:
                    contain_node.color = 1
                    tmp_node = tmp_node.parent
                else:
                    if contain_node.left.color == 0:  # If left child of contain_node is black
                        contain_node.right.color = 0  # set right child of contain_node as black
                        contain_node.color = 1
                        self.LR(contain_node)  # call left rotation on tmp_node
                        contain_node = tmp_node.parent.left

                    contain_node.color = tmp_node.parent.color
                    tmp_node.parent.color = 0
                    contain_node.left.color = 0
                    self.RR(tmp_node.parent)
                    tmp_node = self.root
        tmp_node.color = 0


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