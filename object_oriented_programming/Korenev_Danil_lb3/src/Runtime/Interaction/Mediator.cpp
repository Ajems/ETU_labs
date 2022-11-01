#include <iostream>
#include "Mediator.h"

Mediator::Mediator(){
    LogPool::getInstance()->addStream(commandReader->readLoggers());
    setLogLevels();
    commandReader = new CommandReader();
    controller = new Controller(std::pair<int, int>({commandReader->getFieldWidth(), commandReader->getFieldHeight()}));
};


void Mediator::notify(MediatorObject* mediatorObject) {
    if(typeid(mediatorObject) == typeid(this->commandReader)){
        commandReader->notify(command);
    }
    else if (typeid(mediatorObject) == typeid(this->controller)){
        controller->notify(command);
    };
};

void Mediator::start() {
    Message message = Message(Levels::StatusMessage, "Game start");
    LogPool::getInstance()->printLog(&message);

    help();
    while (update());

    message = Message(Levels::StatusMessage, "End game");
    LogPool::getInstance()->printLog(&message);
    LogPool::getInstance()->deleteLoggers();
}

void Mediator::help() const {
    std::string data = "Use \"wasd\" keys to move\t\"e\" for exit game\n\nh - help\nl - change log way\nc - change log levels\n\n";
    std::cout << data;
}


bool Mediator::update(){
    commandReader->notify(command);
    if (command == 'e') return false;
    if (command == 'h') help();
    if (command == 'l') changeLog();
    if (command == 'c') setLogLevels();
    controller->notify(command);
    return !controller->isEndGame();
}

void Mediator::changeLog() {
    LogPool::getInstance()->addStream(commandReader->readLoggers());
}


void Mediator::setLogLevels() {
    std::vector<std::string> levelsInput = commandReader->readLevels();
    std::vector<Levels> levels;
    for(auto lvl : levelsInput){
        levels.push_back(levelsConverte.at(lvl));
    }
    LogPool::getInstance()->setLevels(levels);
}