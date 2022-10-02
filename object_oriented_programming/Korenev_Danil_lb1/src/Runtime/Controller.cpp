#include "Controller.h"


void Controller::createField(unsigned int width, unsigned int height) {
    field = Field(std::pair<unsigned int, unsigned int>({width, height}));
}

void Controller::movePlayerPosition(char c) {
    Player::STEP s;
    switch (c) {
        case 'w':
            s = Player::UP;
            break;
        case 's':
            s = Player::DOWN;
            break;
        case 'a':
            s = Player::LEFT;
            break;
        case 'd':
            s = Player::RIGHT;
            break;
        default:
            s = Player::NOTHING;
            break;
    }
    field.movePlayer(s);
}

void Controller::printFieldView() const{
    fieldView.printFieldView(&field);
}

void Controller::notify(char& command) {
    movePlayerPosition(command);
    printFieldView();
}


