#ifndef LAB2_OPENFILEEXCEPTION_H
#define LAB2_OPENFILEEXCEPTION_H


#include "../GameException.h"

class OpenFileException: public GameException{
public:
    using GameException::GameException;
    std::string what() final;
};


#endif
