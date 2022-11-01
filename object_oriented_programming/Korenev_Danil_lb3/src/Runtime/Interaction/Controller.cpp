#include <iostream>
#include "Controller.h"

Controller::Controller(std::pair<int, int> size): fieldView(FieldView(&model)), model(Model(size)){};

void Controller::notify(char& command) {
    if (command == 'f'){
        model.createField(std::pair<int, int> ({15, 10}), model.getPlayerPosition());
    }
    else{
        model.movePlayerPosition(command);
    }

}

bool Controller::isEndGame(){
    return model.isEndGame();
}
