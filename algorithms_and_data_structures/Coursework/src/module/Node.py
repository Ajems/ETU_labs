class Node:
    def __init__(self, val, data, color = 1, left=None, right=None, parent=None):
        self.val = self.hash_key(val)
        self.key = val
        self.data = data
        self.parent = parent
        self.left = left
        self.right = right
        self.color = color

    @classmethod
    def hash_key(cls, key):
        key = str(key)
        hash_code = 0
        for i in range(len(key)):
            hash_code += (ord(key[-i - 1]) * (19 ** i))
        return hash_code
