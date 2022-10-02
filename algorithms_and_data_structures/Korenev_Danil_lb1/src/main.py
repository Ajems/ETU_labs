from modules.Tree import Tree


def main():
    length = int(input())
    data = list(map(int, input().split(" ")))
    print(Tree(data, length).getHeight())
    return 0


if __name__ == "__main__":
    main()