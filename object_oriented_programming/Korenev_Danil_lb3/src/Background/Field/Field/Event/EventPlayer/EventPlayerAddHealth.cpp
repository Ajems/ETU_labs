#include "EventPlayerAddHealth.h"

EventPlayerAddHealth::EventPlayerAddHealth(int value): value(value){};

void EventPlayerAddHealth::changePlayer(Player* player) {
    player->addHealth(value);
}

