class Node():
    def __init__(self, val, data, color = 1, left=None, right=None, parent=None):
        self.val = hash(val)
        self.data = data
        self.parent = parent
        self.left = left
        self.right = right
        self.color = color