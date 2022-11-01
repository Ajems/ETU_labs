#include "EventFieldSpawnCoins.h"
#include "../EventPlayer/EventPlayerAddCoin.h"

void EventFieldSpawnCoins::changeField(Field *field) {
    std::pair<int, int> player_position =  field->getPlayerPosition();
    for(int w = -1; w != 2; ++w){
        for(int h = -1; h != 2; ++h){
            if (0 <= player_position.second+h and player_position.second+h < field->getFieldSize().second and 0 <= player_position.first+w and player_position.first+w < field->getFieldSize().first and !(h == 0 and w == 0)){
                auto* addCoin = new EventPlayerAddCoin(10);
                field->getCell(std::pair<int, int>({player_position.first+w, player_position.second+h})).setEvent(addCoin);
            }
        }
    }
}