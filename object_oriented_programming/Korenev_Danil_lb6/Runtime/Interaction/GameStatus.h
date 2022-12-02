#ifndef LAB2_GAMESTATUS_H
#define LAB2_GAMESTATUS_H


#include "../../Background/Field/Field/Field.h"

class GameStatus {
public:
    bool isEndGame(Field*, Player*) const;
private:
    bool isWin(Field*, Player*) const;
    bool isLoose(Field*, Player*) const;
};


#endif
