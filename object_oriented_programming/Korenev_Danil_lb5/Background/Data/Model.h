#ifndef LAB2_MODEL_H
#define LAB2_MODEL_H


#include <utility>
#include "Observable.h"
#include "../Field/Field/Field.h"
#include "../../Runtime/Config/Control.h"
#include "../Field/Field/Strategy/LevelStrategy.h"
#include "../Field/Field/Strategy/Levels/FirstLevel.h"
#include "../Field/Field/Strategy/Levels/SecondLevel.h"
#include "../Field/Field/Strategy/LevelContext.h"

class Model: public Observable {
private:
    Field* field;
    Player player;
    bool endGame = false;
    std::map<std::string, LevelStrategy*> levels = {
            {"1", new FirstLevel()},
            {"2", new SecondLevel()}
    };
    LevelContext context;
public:
    Model();
    ~Model();
    void createField(const std::string&);
    void movePlayerPosition(Control);
    Field* getField();
    bool isEndGame();
    void setEndGame();
    void callEvent(std::pair<int, int>);
};


#endif