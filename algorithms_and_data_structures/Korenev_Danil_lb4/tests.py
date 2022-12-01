from main import *
import unittest

class MyTests(unittest.TestCase):
    def test1(self):
        string = MyString("qwertyuiop")
        self.assertEqual(string.subString("asd"), [])

    def test2(self):
        string = MyString("qwertyuiop")
        self.assertEqual(string.subString("iop"), [7])

    def test3(self):
        string = MyString("qwertyuiop")
        self.assertEqual(string.subString("qwe"), [0])

    def test4(self):
        string = MyString("qertyqweuiop")
        self.assertEqual(string.subString("qwe"), [5])

    def test5(self):
        string = MyString("qertyqweuiop")
        self.assertEqual(string.subString("q"), [0, 5])

    def test6(self):
        string = MyString("qertyqweuiop")
        self.assertEqual(string.subString("qertyqweuiop"), [0])