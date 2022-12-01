class MyString:
    base = ord('a')
    string = []
    sub = []
    subSum= 0
    hashData = []

    def __init__(self, string):
        self.string = list(string)


    def subString(self, sub):
        self.sub = list(sub)
        for i in range(len(self.sub)):
            self.subSum += (ord(self.sub[i]) - self.base) * 2 ** (len(self.sub) - i - 1)

        return self.hashingString()

    def hashingString(self):
        ln = len(self.sub)
        ans = []
        #first init
        sum = 0
        for i in range(ln):
            sum+=(ord(self.string[i])-self.base)*2**(ln-i-1)
        self.hashData.append(sum)
        if sum == self.subSum:
            if self.sub == self.string[0:ln]:
                ans.append(0)

        for i in range (len(self.string)-ln):
            sum-=(ord(self.string[i])-self.base)*2**(ln-1)
            sum*=2
            sum+=(ord(self.string[i+ln])-self.base)
            self.hashData.append(sum)
            if sum == self.subSum:
                if self.sub == self.string[i+1:i+1+ln]:
                    ans.append(i+1)

        return(ans)


def main():
    sub = input()
    st = input()
    string = MyString(st)
    print(string.subString(sub))
    return 0

if __name__ == "__main__":
    main()
