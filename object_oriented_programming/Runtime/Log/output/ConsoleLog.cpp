#include <iostream>
#include "ConsoleLog.h"

void ConsoleLog::output(Message* msg) {
    std::cout << *msg << '\n';
}