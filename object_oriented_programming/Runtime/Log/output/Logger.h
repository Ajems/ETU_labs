#ifndef LAB2_LOGGER_H
#define LAB2_LOGGER_H


#include <string>
#include "../Message/Message.h"

class Logger {
public:
    virtual void output(Message*) = 0;
    virtual ~Logger() = default;
};


#endif
