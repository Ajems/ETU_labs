#ifndef LAB2_GENERATIONCELL_H
#define LAB2_GENERATIONCELL_H


#include "../Field.h"
#include "../../../../Runtime/Log/Message/Message.h"
#include "../../../../Runtime/Log/LogPool/LogPool.h"

template <typename cellType, int start, int end, int top, int thick>
class GenerationCell {
public:
    void operator()(Field& field){
        for (int t = 0; t < thick; ++t){
            for (int w = start; w < end; ++w){
                try{
                    field.changeCell(std::pair{w, top-t}, new cellType());
                } catch (...) {
                    Message message = Message(Levels::ErrorMessage, "Could not generate cell" + std::to_string(top-t) + "\t" + std::to_string(w));
                    LogPool::getInstance()->printLog(&message);
                }
            }
        }
    }
};

#endif
