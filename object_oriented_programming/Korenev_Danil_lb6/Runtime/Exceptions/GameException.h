#ifndef LAB2_GAMEEXCEPTION_H
#define LAB2_GAMEEXCEPTION_H


#include <exception>
#include <string>

class GameException: public std::exception {
protected:
    std::string message;
public:
    explicit GameException(std::string);
    virtual std::string what() = 0;
};


#endif
