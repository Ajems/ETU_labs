#include "EventPlayerAddShield.h"

EventPlayerAddShield::EventPlayerAddShield(size_t hash): hashCode(hash){};

void EventPlayerAddShield::changePlayer(Player* player) {
    player->addShield(value);
}

size_t EventPlayerAddShield::hash() {
    return hashCode;
}
