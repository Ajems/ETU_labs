#include <iostream>
#include "Mediator.h"
#include "../../Background/Field/Field/GenerationRule/GenerationFieldSize.h"

Mediator::Mediator(){
    commandReader = new CommandReader();

    LogPool::getInstance()->setStream(commandReader->readLoggers());
    setLogLevels();
    commandReader->setConfig();

    controller = new Controller(commandReader->chooseLevel());
};


void Mediator::notify(MediatorObject* mediatorObject) {
    if(typeid(*mediatorObject) == typeid(*this->commandReader)){
        commandReader->notify(command);
    }
    else if (typeid(*mediatorObject) == typeid(*this->controller)){
        controller->notify(command);
    }
};

void Mediator::start() {
    Message message = Message(Levels::StatusMessage, "Game start");
    LogPool::getInstance()->printLog(&message);

    while (update());

    message = Message(Levels::StatusMessage, "End game");
    LogPool::getInstance()->printLog(&message);

    LogPool::getInstance()->deleteLoggers();
    LogPool::getInstance()->deleteInstance();
}


bool Mediator::update(){
    notify(commandReader);
    notify(controller);
    return !controller->isEndGame();
}

void Mediator::setLogLevels() {
    std::vector<std::string> levelsInput = commandReader->readLevels();
    std::vector<Levels> levels;
    for(auto lvl : levelsInput){
        levels.push_back(levelsConverter.at(lvl));
    }
    LogPool::getInstance()->setLevels(levels);
}

Mediator::~Mediator() {
    delete commandReader;
    delete controller;
}
