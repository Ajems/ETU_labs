#include "EventFieldSpawnCoins.h"
#include "../EventPlayer/EventPlayerAddCoin.h"
#include "../../../../../Runtime/Log/Message/Message.h"
#include "../../../../../Runtime/Log/LogPool/LogPool.h"
#include "../../Field.h"

void EventFieldSpawnCoins::changeField(Field *field) {
    std::pair<int, int> player_position =  field->getPlayerPosition();
    for(int w = -1; w != 2; ++w){
        for(int h = -1; h != 2; ++h){
            try{
                if (0 <= player_position.second+h and player_position.second+h < field->getFieldSize().second and 0 <= player_position.first+w and player_position.first+w < field->getFieldSize().first and !(h == 0 and w == 0)){
                    auto* addCoin = new EventPlayerAddCoin(typeid(EventPlayerAddCoin).hash_code());
                    field->getCell(std::pair<int, int>({player_position.first+w, player_position.second+h})).setEvent(addCoin);
                }
            } catch (...) {
                Message message = Message(Levels::ErrorMessage, "Could not set event coins");
                LogPool::getInstance()->printLog(&message);
            }
        }
    }
}

EventFieldSpawnCoins::EventFieldSpawnCoins(size_t value): hashCode(value) {}

size_t EventFieldSpawnCoins::hash() {
    return hashCode;
}
