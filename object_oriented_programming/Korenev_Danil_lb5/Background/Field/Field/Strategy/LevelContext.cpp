#include "LevelContext.h"

LevelContext::LevelContext(LevelStrategy *strategy): levelStrategy(strategy) {}

void LevelContext::setStrategy(LevelStrategy *strategy) {
    delete levelStrategy;
    levelStrategy = strategy;
}

void LevelContext::setLevel() {
    if (levelStrategy) field = levelStrategy->generate();
}

Field *LevelContext::getField() {
    return field;
}
