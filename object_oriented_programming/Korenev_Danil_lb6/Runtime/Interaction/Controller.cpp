#include <iostream>
#include <fstream>
#include "Controller.h"

Controller::Controller(std::string level): fieldView(FieldView(&model)), model(Model()){
    model.createField(level);
    model.notify();
};

void Controller::notify(Control& command) {
    if (command == Control::EXIT) model.setEndGame();
    else model.movePlayerPosition(command);
}

bool Controller::isEndGame(){
    return model.isEndGame();
}
