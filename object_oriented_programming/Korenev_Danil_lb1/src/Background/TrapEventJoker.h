#ifndef GAME_TRAPEVENTJOKER_H
#define GAME_TRAPEVENTJOKER_H

#include "Event.h"


class TrapEventJoker: public Event{
public:
    TrapEventJoker() = default;
    ~TrapEventJoker() override;
    void callReaction() override;
};


#endif
