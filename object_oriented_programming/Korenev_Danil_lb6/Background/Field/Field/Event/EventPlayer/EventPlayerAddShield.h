#ifndef LAB2_EVENTPLAYERADDSHIELD_H
#define LAB2_EVENTPLAYERADDSHIELD_H


#include "EventPlayer.h"

class EventPlayerAddShield: public EventPlayer{
public:
    explicit EventPlayerAddShield(size_t hash = size_t(1));
    ~EventPlayerAddShield() override = default;
    size_t hash() override;
private:
    size_t hashCode;
    void changePlayer(Player* player) override;
    int value = 10;
};



#endif
