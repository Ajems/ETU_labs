#ifndef LAB2_MEDIATOR_H
#define LAB2_MEDIATOR_H

class CommandReader;
#include "MediatorObject.h"
#include "Controller.h"
#include "../Log/output/Logger.h"
#include "../Log/LogPool/LogPool.h"
#include "../Config/FileConfig/FileConfig.h"
#include "CommandReader.h"

class Mediator {
public:
    Mediator();
    ~Mediator();
    void start();
private:
    char command = ' ';
    CommandReader* commandReader = nullptr;
    Controller* controller = nullptr;
    FileConfig* fileConfig = nullptr;
    void setLogLevels();
    void notify(MediatorObject*);
    bool update();
    std::map<std::string, Levels> levelsConverte{
            {"game", Levels::GameMessage},
            {"status", Levels::StatusMessage},
            {"error", Levels::ErrorMessage}
    };
    std::string configFileName;
};


#endif
