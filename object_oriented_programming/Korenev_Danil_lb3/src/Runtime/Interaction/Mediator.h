#ifndef LAB2_MEDIATOR_H
#define LAB2_MEDIATOR_H


#include "MediatorObject.h"
#include "CommandReader.h"
#include "Controller.h"
#include "../Log/output/Logger.h"
#include "../Log/LogPool/LogPool.h"

class Mediator {
public:
    Mediator();
    void start();
private:
    char command = ' ';
    CommandReader* commandReader = nullptr;
    Controller* controller = nullptr;
    void changeLog();
    void setLogLevels();
    void help() const;
    void notify(MediatorObject*);
    bool update();
    std::map<std::string, Levels> levelsConverte{
            {"game", Levels::GameMessage},
            {"status", Levels::StatusMessage},
            {"error", Levels::ErrorMessage}
    };
};


#endif
