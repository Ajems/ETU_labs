#include <random>
#include "EventPlayerOpenChest.h"

EventPlayerOpenChest::EventPlayerOpenChest(){
    std::random_device dev;
    std::mt19937 rng(dev());
    std::uniform_int_distribution dist(1, 50);
    value = dist(rng);
};

void EventPlayerOpenChest::changePlayer(Player* player) {
    if (player->getCoins() >= value){
        player->addHealth(value);
        player->downCoins(value);
    }
}
