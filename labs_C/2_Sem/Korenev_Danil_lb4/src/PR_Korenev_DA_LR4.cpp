#include <cstdlib>
#include <string>
#include <iostream>

using namespace std;

struct ListNode{
    ListNode* mNext;
    int mData;
};

class CustomStack {
public:
    CustomStack(){
        mHead = nullptr;
    }
    ~CustomStack(){
        ListNode* cur = mHead;
        while (cur != nullptr){
            ListNode* before = cur->mNext;
            delete cur;
            cur = before;
        }
    }

    void push(int val){
        ListNode* cur;
        cur = new ListNode;
        cur->mNext = mHead;
        cur->mData = val;
        mHead = cur;
    }

    void pop(){
        if (mHead == nullptr){
            cout << "error" << endl;
            exit(0);
        }
        ListNode* tmp = mHead;
        mHead = mHead->mNext;
        delete tmp;
    }

    size_t size(){
        ListNode* cur = mHead;
        size_t size = 0;
        while (cur != nullptr){
            size++;
            cur = cur->mNext;
        }
        return size;
    }

    bool empty(){
        return (mHead == nullptr);
    }

    int top(){
        if (mHead == nullptr) {
            cout << "error" << endl;
            exit(0);
        }
        return mHead->mData;
    }

protected:
    ListNode* mHead;
};

int main() {
    CustomStack stack;
    string input;

    while(cin >> input){
        if(input.find("cmd_push") == 0){
            int value;
            cin >> value;
            stack.push(value);
            cout << "ok" << endl;

        }else if (input.find("cmd_top") == 0){
            cout << stack.top() << endl;

        } else if (input.find("cmd_pop") == 0){
            cout << stack.top() << endl;
            stack.pop();

        } else if (input.find("cmd_size") == 0){
            cout << stack.size() << endl;

        } else if (input.find("cmd_exit") == 0){
            cout << "bye";
            break;

        } else if (input.find("cmd_empty") == 0){
            cout << stack.empty() << endl;
            break;
        }
    }

    return 0;
}