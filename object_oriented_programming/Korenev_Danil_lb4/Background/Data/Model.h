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
    bool endGame = false;
public:
    Model(std::pair<int, int>);
    void createField(std::pair<int, int>, std::pair<int, int>);
    void movePlayerPosition(Control);
    Field* getField();
    bool isEndGame();
    void setEndGame();
    void callEvent(std::pair<int, int>);
};


#endif