import pytest
from modules.Tree import Tree


def test_empty():
    length = 0
    data = []
    assert Tree(data, length).getHeight() == 0


def test_one():
    length = 1
    data = [-1]
    assert Tree(data, length).getHeight() == 1


def test_line():
    length = 5
    data = [2, 0, 4, 1, -1]
    assert Tree(data, length).getHeight() == 5


def test_custom():
    length = 14
    data = [5, 10, 1, 1, 7, 8, 3, 5, 10, 8, -1, 6, 6, 12]
    assert Tree(data, length).getHeight() == 6


def test_value_error():
    with pytest.raises(ValueError):
        length = -1
        data = []
        Tree(data, length).getHeight()
