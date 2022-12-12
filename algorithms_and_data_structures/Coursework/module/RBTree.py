from module.Node import Node
class RBTree:
    NULL = Node(0, 0, 0)
    def __init__(self):
        self.root = self.NULL

    def insert(self, key, data):
        node = Node(key, data, 1, self.NULL, self.NULL, None) #Set red root
        y = None
        x = self.root

        while x != self.NULL : #Find position for new node
            y = x
            if node.val < x.val :
                x = x.left
            else :
                x = x.right

        node.parent = y # Set parent of Node as y
                        # set child for node
        if y == None : # If parent None, then it is root node
            self.root = node
        elif node.val < y.val : # Check if it is right Node or Left Node by checking the value
            y.left = node
        else :
            y.right = node

        if node.parent == None : # Root node is always Black
            node.color = 0
            return

        if node.parent.parent == None : # If parent of node is Root Node
            return

        self.__fixNodeInsert__ (node) # Else call for Fix Up

    def get(self, key):
        node = hash(key)
        root = self.root
        tmp = self.NULL
        while root != self.NULL:  # Search for the root having that value/ key and store it in 'tmp'
            if root.val == node:
                tmp = root

            if root.val <= node:
                root = root.right
            else:
                root = root.left

        if tmp == self.NULL :                                # If Kwy is not present then deletion not possible so return
            print ( "Value not present in Tree !!" )
            return
        return tmp.data

    def __fixNodeInsert__(self, node):
        while node.parent.color == 1:                        # While parent is red
            if node.parent == node.parent.parent.right:         # if parent is right child of its parent
                uncle = node.parent.parent.left                  # Left child of grandparent
                if uncle.color == 1:                          # if color of left child of grandparent i.e, uncle node is red
                    uncle.color = 0                           # Set both children of grandparent node as black
                    node.parent.color = 0
                    node.parent.parent.color = 1             # Set grandparent node as Red
                    node = node.parent.parent                   # Repeat the algo with Parent node to check conflicts
                else:
                    if node == node.parent.left:                # If k is left child of it's parent
                        node = node.parent
                        self.RR(node)                        # Call for right rotation
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    self.LR(node.parent.parent)
            else:                                         # if parent is left child of its parent
                uncle = node.parent.parent.right                 # Right child of grandparent
                if uncle.color == 1:                          # if color of right child of grandparent i.e, uncle node is red
                    uncle.color = 0                           # Set color of childs as black
                    node.parent.color = 0
                    node.parent.parent.color = 1             # set color of grandparent as Red
                    node = node.parent.parent                   # Repeat algo on grandparent to remove conflicts
                else:
                    if node == node.parent.right:               # if k is right child of its parent
                        node = node.parent
                        self.LR(node)                        # Call left rotate on parent of k
                    node.parent.color = 0
                    node.parent.parent.color = 1
                    self.RR(node.parent.parent)              # Call right rotate on grandparent
            if node == self.root:                            # If k reaches root then break
                break
        self.root.color = 0                               # Set color of root as black



    # Code for left rotate
    def LR (self, node) :
        tmp = node.right                                      # Y = Right child of x
        node.right = tmp.left                                 # Change right child of x to left child of tmp
        if tmp.left != self.NULL :
            tmp.left.parent = node

        tmp.parent = node.parent                              # Change parent of tmp as parent of x
        if node.parent == None :                            # If parent of x == None ie. root node
            self.root = tmp                                # Set tmp as root
        elif node == node.parent.left :
            node.parent.left = tmp
        else :
            node.parent.right = tmp
        tmp.left = node
        node.parent = tmp


    # Code for right rotate
    def RR (self, node) :
        tmp = node.left                                       # Y = Left child of x
        node.left = tmp.right                                 # Change left child of x to right child of tmp
        if tmp.right != self.NULL :
            tmp.right.parent = node

        tmp.parent = node.parent                              # Change parent of tmp as parent of x
        if node.parent == None :                            # If x is root node
            self.root = tmp                                # Set tmp as root
        elif node == node.parent.right :
            node.parent.right = tmp
        else :
            node.parent.left = tmp
        tmp.right = node
        node.parent = tmp

    # Function to transplant nodes
    def __rb_transplant (self, old, new) :
        if old.parent == None :
            self.root = new
        elif old == old.parent.left :
            old.parent.left = new
        else :
            old.parent.right = new
        new.parent = old.parent

    # Deletion of node
    def remove (self, node) : # node is key
        node = hash(node)

        root = self.root
        tmp = self.NULL
        while root != self.NULL :                          # Search for the root having that value/ key and store it in 'tmp'
            if root.val == node :
                tmp = root
            if root.val <= node :
                root = root.right
            else :
                root = root.left

        if tmp == self.NULL :                                # If Kwy is not present then deletion not possible so return
            print ( "Value not present in Tree !!" )
            return

        y = tmp
        y_original_color = y.color                          # Store the color of tmp- root
        if tmp.left == self.NULL :                            # If left child of tmp is NULL
            x = tmp.right                                     # Assign right child of tmp to x
            self.__rb_transplant ( tmp , tmp.right )            # Transplant Node to be deleted with x
        elif (tmp.right == self.NULL) :                       # If right child of tmp is NULL
            x = tmp.left                                      # Assign left child of tmp to x
            self.__rb_transplant ( tmp , tmp.left )             # Transplant Node to be deleted with x
        else :                                              # If tmp has both the child nodes
            y = self.minimum ( tmp.right )                    # Find minimum of the right sub tree
            y_original_color = y.color                      # Store color of y
            x = y.right
            if y.parent == tmp :                              # If y is child of tmp
                x.parent = y                                # Set parent of x as y
            else :
                self.__rb_transplant ( y , y.right )
                y.right = tmp.right
                y.right.parent = y

            self.__rb_transplant ( tmp , y )
            y.left = tmp.left
            y.left.parent = y
            y.color = tmp.color
        if y_original_color == 0 :                          # If color is black then fixing is needed
            self.fixDelete (x)



    # Function to fix issues after deletion
    def fixDelete (self, node) :
        while node != self.root and node.color == 0 :           # Repeat until x reaches nodes and color of x is black
            if node == node.parent.left :                       # If x is left child of its parent
                s = node.parent.right                        # Sibling of x
                if s.color == 1 :                         # if sibling is red
                    s.color = 0                           # Set its color to black
                    node.parent.color = 1                    # Make its parent red
                    self.LR (node.parent)                  # Call for left rotate on parent of x
                    s = node.parent.right
                # If both the child are black
                if s.left.color == 0 and s.right.color == 0 :
                    s.color = 1                           # Set color of s as red
                    node = node.parent
                else :
                    if s.right.color == 0 :               # If right child of s is black
                        s.left.color = 0                  # set left child of s as black
                        s.color = 1                       # set color of s as red
                        self.RR ( s )                     # call right rotation on x
                        s = node.parent.right

                    s.color = node.parent.color
                    node.parent.color = 0                    # Set parent of x as black
                    s.right.color = 0
                    self.LR (node.parent)                  # call left rotation on parent of x
                    node = self.root
            else :                                        # If x is right child of its parent
                s = node.parent.left                         # Sibling of x
                if s.color == 1 :                         # if sibling is red
                    s.color = 0                           # Set its color to black
                    node.parent.color = 1                    # Make its parent red
                    self.RR (node.parent)                  # Call for right rotate on parent of x
                    s = node.parent.left

                if s.right.color == 0 and s.right.color == 0 :
                    s.color = 1
                    node = node.parent
                else :
                    if s.left.color == 0 :                # If left child of s is black
                        s.right.color = 0                 # set right child of s as black
                        s.color = 1
                        self.LR ( s )                     # call left rotation on x
                        s = node.parent.left

                    s.color = node.parent.color
                    node.parent.color = 0
                    s.left.color = 0
                    self.RR (node.parent)
                    node = self.root
        node.color = 0


    # Function to print
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


    def minimum(self, node):
        while node.left != self.NULL:
            node = node.left
        return node

    # Function to call print
    def print_tree ( self ) :
        self.__printCall ( self.root , "" , True )


if __name__ == "__main__":
    bst = RBTree()

    bst.insert(10)
    bst.insert(20)
    bst.insert(30)
    bst.insert(5)
    bst.insert(4)
    bst.insert(2)

    bst.print_tree()

    print("\nAfter deleting an element")
    bst.remove(2)
    bst.print_tree()
    print("\nAfter deleting an element")


    bst.remove(5)
    bst.print_tree()
