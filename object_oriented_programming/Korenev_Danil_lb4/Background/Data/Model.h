#ifndef LAB2_MODEL_H
#define LAB2_MODEL_H


#include <utility>
#include "Observable.h"
#include "../Field/Field/Field.h"
#include "../../Runtime/Config/Control.h"

class Model: public Observable {
private:
    Field field;
    Player player;
    std::map<Control, Player::STEP> move = {
            {Control::UP, Player::UP},
            {Control::LEFT, Player::LEFT},
            {Control::DOWN, Player::DOWN},
            {Control::RIGHT, Player::RIGHT},
            {Control::NOTHING, Player::NOTHING}
    };
    bool endGame = false;
public:
    Model(std::pair<int, int>);
    void createField(std::pair<int, int>, std::pair<int, int>);
    void movePlayerPosition(Control);
    std::pair<int, int> getPlayerPosition() const;
    Field* getField();
    bool isEndGame();
    void setEndGame();
    void callEvent(std::pair<int, int>);
};


#endif