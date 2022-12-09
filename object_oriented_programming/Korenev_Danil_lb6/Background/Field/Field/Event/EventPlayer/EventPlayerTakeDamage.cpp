
#include "EventPlayerTakeDamage.h"

EventPlayerTakeDamage::EventPlayerTakeDamage(size_t hash): hashCode(hash){}

void EventPlayerTakeDamage::changePlayer(Player* player) {
    player->takeDamage(value);
}

size_t EventPlayerTakeDamage::hash() {
    return hashCode;
}
