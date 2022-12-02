#ifndef LAB2_LEVELSTRATEGY_H
#define LAB2_LEVELSTRATEGY_H


#include "../Field.h"

class LevelStrategy{
public:
    virtual Field* generate() = 0;
    virtual ~LevelStrategy() = default;
};

#endif