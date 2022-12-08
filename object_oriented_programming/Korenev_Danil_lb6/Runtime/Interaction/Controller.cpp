#include <iostream>
#include <fstream>
#include "Controller.h"

Controller::Controller(std::string level): fieldView(FieldView(&model)), model(Model()){
    model.createField(level);
    model.notify();
};

void Controller::notify(Control& command) {
    if (interaction.find(command) == interaction.end()){
        model.movePlayerPosition(command);
    } else {
        interaction.at(command)();
    }
}

bool Controller::isEndGame(){
    return model.isEndGame();
}
