#ifndef LAB2_SAVESTATEEXCEPTION_H
#define LAB2_SAVESTATEEXCEPTION_H


#include "../GameException.h"

class SaveStateException: public GameException{
public:
    using GameException::GameException;
    std::string what() final;

};


#endif