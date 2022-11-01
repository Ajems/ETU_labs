#ifndef LAB2_EVENTPLAYERADDSHIELD_H
#define LAB2_EVENTPLAYERADDSHIELD_H


#include "EventPlayer.h"

class EventPlayerAddShield: public EventPlayer{
public:
    explicit EventPlayerAddShield(int value = 10);
    ~EventPlayerAddShield() override = default;
private:
    void changePlayer(Player* player) override;
    int value;
};



#endif
