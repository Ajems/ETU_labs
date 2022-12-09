#ifndef LAB2_RESTORESTATEEXCEPTION_H
#define LAB2_RESTORESTATEEXCEPTION_H


#include "../GameException.h"

class RestoreStateException: public GameException{
public:
    using GameException::GameException;
    std::string what() final;

};

#endif