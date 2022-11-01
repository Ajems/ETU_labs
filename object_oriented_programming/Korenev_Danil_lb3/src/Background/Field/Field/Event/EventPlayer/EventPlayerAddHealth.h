#ifndef LAB2_EVENTPLAYERADDHEALTH_H
#define LAB2_EVENTPLAYERADDHEALTH_H


#include "EventPlayer.h"

class EventPlayerAddHealth: public EventPlayer{
public:
    explicit EventPlayerAddHealth(int value = 10);
    ~EventPlayerAddHealth() override = default;
private:
    void changePlayer(Player* player) override;
    int value;
};


#endif
