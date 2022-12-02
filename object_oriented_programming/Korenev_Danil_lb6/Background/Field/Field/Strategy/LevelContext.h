#ifndef LAB2_LEVELCONTEXT_H
#define LAB2_LEVELCONTEXT_H


#include "../Field.h"
#include "LevelStrategy.h"

class LevelContext {
private:
    Field* field;
    LevelStrategy* levelStrategy;
public:
    explicit LevelContext(LevelStrategy*);
    void setStrategy(LevelStrategy*);
    void setLevel();
    Field* getField();
};


#endif
