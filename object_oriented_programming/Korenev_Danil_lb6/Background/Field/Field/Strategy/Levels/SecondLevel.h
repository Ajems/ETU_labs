#ifndef LAB2_SECONDLEVEL_H
#define LAB2_SECONDLEVEL_H

#include "../LevelStrategy.h"

class SecondLevel: public LevelStrategy{
public:
    Field* generate() final;
};



#endif
