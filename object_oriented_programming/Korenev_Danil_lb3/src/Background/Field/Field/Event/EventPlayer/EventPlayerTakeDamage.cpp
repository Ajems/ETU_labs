
#include "EventPlayerTakeDamage.h"

EventPlayerTakeDamage::EventPlayerTakeDamage(int value): value(value){}

void EventPlayerTakeDamage::changePlayer(Player* player) {
    player->takeDamage(value);
}