#include "EventPlayerAddCoin.h"

EventPlayerAddCoin::EventPlayerAddCoin(int value): value(value){};

void EventPlayerAddCoin::changePlayer(Player *player){
    player->addCoins(value);
}