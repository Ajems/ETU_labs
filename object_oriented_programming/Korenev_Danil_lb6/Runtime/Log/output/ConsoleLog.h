#ifndef LAB2_CONSOLELOG_H
#define LAB2_CONSOLELOG_H


#include "Logger.h"

class ConsoleLog: public Logger{
public:
    void output(Message*) override;
    ~ConsoleLog() override = default;
};


#endif
