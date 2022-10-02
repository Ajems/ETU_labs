#ifndef GAME_MEDIATOR_H
#define GAME_MEDIATOR_H


#include "MediatorObject.h"
#include "CommandReader.h"
#include "Controller.h"

class Mediator {
public:
    Mediator(Controller&, CommandReader&);
    void start();
private:
    char command = ' ';
    CommandReader commandReader;
    Controller controller;
    void notify(MediatorObject&);
    bool update();
    std::string help = "Use WASD to move\te for exit game";
};


#endif
