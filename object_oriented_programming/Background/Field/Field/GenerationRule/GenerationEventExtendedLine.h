#ifndef LAB2_GENERATIONEVENTEXTENDEDLINE_H
#define LAB2_GENERATIONEVENTEXTENDEDLINE_H


#include "../Field.h"
#include "../../../../Runtime/Log/Message/Message.h"
#include "../../../../Runtime/Log/LogPool/LogPool.h"

template <typename event, int start, int end, int top, int thick,  int value1 = 0, int value2 = 0>
class GenerationEventExtendedLine {
public:
    void operator()(Field& field){
        for (int t = 0; t < thick; ++t){
            for (int w = start; w < end; ++w){
                try{
                    field.setEvent(std::pair{w, top-t}, new event(value1, value2));
                } catch(...) {
                    Message message = Message(Levels::ErrorMessage, "Could not set event extended by line");
                    LogPool::getInstance()->printLog(&message);
                }
            }
        }
    }
};


#endif
