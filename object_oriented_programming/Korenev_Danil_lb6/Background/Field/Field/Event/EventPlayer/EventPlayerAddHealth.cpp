#include "EventPlayerAddHealth.h"

EventPlayerAddHealth::EventPlayerAddHealth(size_t hash): hashCode(hash){};

void EventPlayerAddHealth::changePlayer(Player* player) {
    player->addHealth(value);
}

size_t EventPlayerAddHealth::hash() {
    return hashCode;
}

