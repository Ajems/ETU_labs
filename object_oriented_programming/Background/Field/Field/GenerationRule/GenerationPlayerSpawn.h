#ifndef LAB2_GENERATIONPLAYERSPAWN_H
#define LAB2_GENERATIONPLAYERSPAWN_H

#include <iostream>
#include "../Cell/CellPlayer.h"
#include "../Field.h"
#include "../../../../Runtime/Log/Message/Message.h"
#include "../../../../Runtime/Log/LogPool/LogPool.h"

template<int width, int height>
class GenerationPlayerSpawn {
public:
    void operator()(Field& field){
        if (!field.isPlayerSpawned()){
            try {
                field.setCell(std::pair{width, height}, "Player");
                field.setPlayerPosition(std::pair{width, height});
            } catch (...) {
                Message message = Message(Levels::ErrorMessage, "Could not set player because of incorrect position");
                LogPool::getInstance()->printLog(&message);
            }
        } else {
            Message message = Message(Levels::ErrorMessage, "Player was already spawned");
            LogPool::getInstance()->printLog(&message);
        }
    }
};


#endif
