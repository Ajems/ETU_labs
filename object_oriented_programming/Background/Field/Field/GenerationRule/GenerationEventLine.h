#ifndef LAB2_GENERATIONEVENTLINE_H
#define LAB2_GENERATIONEVENTLINE_H


#include "../Field.h"
#include "../../../../Runtime/Log/Message/Message.h"
#include "../../../../Runtime/Log/LogPool/LogPool.h"

template<typename event, int start, int end, int top, int thick>
class GenerationEventLine {
public:
    void operator()(Field &field) {
        for (int t = 0; t < thick; ++t) {
            for (int w = start; w < end; ++w) {
                try {
                    field.setEvent(std::pair{w, top - t}, new event());
                } catch (...) {
                    Message message = Message(Levels::ErrorMessage, "Could not set event by line");
                    LogPool::getInstance()->printLog(&message);
                }
            }
        }
    }
};


#endif
