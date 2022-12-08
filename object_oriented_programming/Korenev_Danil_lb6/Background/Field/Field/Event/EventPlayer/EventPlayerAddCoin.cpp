#include "EventPlayerAddCoin.h"

EventPlayerAddCoin::EventPlayerAddCoin(size_t hash): hashCode(hash){};

void EventPlayerAddCoin::changePlayer(Player *player){
    player->addCoins(value);
}

size_t EventPlayerAddCoin::hash() {
    return hashCode;
}
