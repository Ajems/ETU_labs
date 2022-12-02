#ifndef LAB2_FIRSTLEVEL_H
#define LAB2_FIRSTLEVEL_H

#include "../LevelStrategy.h"

class FirstLevel: public LevelStrategy{
public:
    Field* generate() final;
};


#endif
