#ifndef GAME_TRAPEVENTBANANA_H
#define GAME_TRAPEVENTBANANA_H

#include "Event.h"


class TrapEventBanana: public Event{
public:
    TrapEventBanana() = default;
    ~TrapEventBanana() override;
    void callReaction() override;
};


#endif
