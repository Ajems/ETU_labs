#include <iostream>
#include <fstream>
#include "Controller.h"

Controller::Controller(std::string level): fieldView(FieldView(&model)), model(Model()){
    model.createField(level);
    model.notify();
};

void Controller::notify(Control& command) {
    if (interaction.find(command) == interaction.end()){
        std::cout << "COMMAND MOVE PLAYER\n";
        model.movePlayerPosition(command);
    } else {
        std::cout << "COMMAND EXIT SAVE RESTORE\n";
        interaction.at(command)();
    }
}

bool Controller::isEndGame(){
    return model.isEndGame();
}
