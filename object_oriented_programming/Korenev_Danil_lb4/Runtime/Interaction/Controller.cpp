#include <iostream>
#include <fstream>
#include "Controller.h"

Controller::Controller(std::pair<int, int> size): fieldView(FieldView(&model)), model(Model(size)){
    model.notify();
};

void Controller::notify(Control& command) {
    if (command == Control::EXIT) model.setEndGame();
    else model.movePlayerPosition(command);
}

bool Controller::isEndGame(){
    return model.isEndGame();
}
