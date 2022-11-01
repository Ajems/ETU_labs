#include "EventPlayerAddShield.h"

EventPlayerAddShield::EventPlayerAddShield(int value): value(value){};

void EventPlayerAddShield::changePlayer(Player* player) {
    player->addShield(value);
}
