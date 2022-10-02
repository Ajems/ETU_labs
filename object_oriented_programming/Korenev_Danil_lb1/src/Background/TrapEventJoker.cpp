#include <iostream>
#include "TrapEventJoker.h"


TrapEventJoker::~TrapEventJoker() {
    std::cout << "Joker broke\n";
};

void TrapEventJoker::callReaction() {
    std::cout << "Joker's trap\n";
}