#include <iostream>
#include "TrapEventBanana.h"


TrapEventBanana::~TrapEventBanana(){
    std::cout << "Banana broke\n";
}

void TrapEventBanana::callReaction() {
    std::cout << "You stepped on a banana\n";
}