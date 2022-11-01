#ifndef LAB2_MODEL_H
#define LAB2_MODEL_H


#include <utility>
#include "Observable.h"
#include "../Field/Field/Field.h"

class Model: public Observable {
private:
    Field field;
    Player player;
    std::map<char, Player::STEP> move = {
            {'w', Player::UP},
            {'a', Player::LEFT},
            {'s', Player::DOWN},
            {'d', Player::RIGHT},
            {'n', Player::NOTHING}
    };
public:
    Model(std::pair<int, int>);
    void createField(std::pair<int, int>, std::pair<int, int>);
    void movePlayerPosition(char c);
    std::pair<int, int> getPlayerPosition() const;
    Field* getField();
    bool isEndGame();
    void callEvent(std::pair<int, int>);

};


#endif