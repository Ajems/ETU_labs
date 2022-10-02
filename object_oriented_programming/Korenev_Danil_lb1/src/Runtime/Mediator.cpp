#include "Mediator.h"
#include "CommandReader.h"
#include "Controller.h"

Mediator::Mediator(Controller& controller, CommandReader& commandReader)
    : controller(controller), commandReader(commandReader){};

void Mediator::notify(MediatorObject &mediatorObject) {
    if(typeid(mediatorObject) == typeid(this->commandReader)){
        commandReader.notify(command);
    }
    else if (typeid(mediatorObject) == typeid(this->controller)){
        controller.notify(command);
    };
};

void Mediator::start() {
    controller.createField(
            commandReader.getFieldWidth(),
            commandReader.getFieldHeight());

    notify(controller);

    while (update());
}


bool Mediator::update(){
    notify(commandReader);
    if (command == 'e') return false;
    if (command == 'h') std::cout << help << '\n';
    notify(controller);
    return true;
}
