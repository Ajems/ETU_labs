#ifndef LAB2_GENERATIONFINISHSPAWN_H
#define LAB2_GENERATIONFINISHSPAWN_H

#include "../Field.h"
#include "../../../../Runtime/Log/Message/Message.h"
#include "../../../../Runtime/Log/LogPool/LogPool.h"

template<int width, int height>
class GenerationFinishSpawn {
    public:
        void operator()(Field& field){
            try{
                field.setFinishPosition(std::pair{width, height});
            } catch (...) {
                Message message = Message(Levels::ErrorMessage, "Incorrect finish position");
                LogPool::getInstance()->printLog(&message);
            }
        }
    };


#endif
