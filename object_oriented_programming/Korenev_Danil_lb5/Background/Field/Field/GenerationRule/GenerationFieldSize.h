#ifndef LAB2_GENERATIONFIELDSIZE_H
#define LAB2_GENERATIONFIELDSIZE_H


#include <iostream>
#include "../Field.h"
#include "../../../../Runtime/Log/Message/Message.h"
#include "../../../../Runtime/Log/LogPool/LogPool.h"

#define MINSIZE 10

template <int width, int height>
class GenerationFieldSize {
public:
    void operator()(Field& field){
        if (!(field.getFieldSize().first == -1 || field.getFieldSize().second == -1)){
            Message message = Message(Levels::ErrorMessage, "Field already exist");
            LogPool::getInstance()->printLog(&message);
            return;
        }
        field.setSize(std::max(width, MINSIZE), std::max(height, MINSIZE));
        for(int h = 0; h < field.getFieldSize().second; ++h){
            field.getMap().emplace_back();
            for(int w = 0; w < field.getFieldSize().first; ++w){
                try{
                    field.getMap().at(h).emplace_back();
                    field.setCell(std::pair{w, h}, "Grass");
                } catch (...){
                    Message message = Message(Levels::ErrorMessage, "Could not generate cell" + std::to_string(h) + "\t" + std::to_string(w));
                    LogPool::getInstance()->printLog(&message);
                }
            }
        }
    }
};


#endif