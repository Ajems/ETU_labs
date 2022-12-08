#ifndef LAB2_EVENTPLAYERADDHEALTH_H
#define LAB2_EVENTPLAYERADDHEALTH_H


#include "EventPlayer.h"

class EventPlayerAddHealth: public EventPlayer{
public:
    explicit EventPlayerAddHealth(size_t hash = size_t(1));
    ~EventPlayerAddHealth() override = default;
    size_t hash() override;
private:
    size_t hashCode;
    void changePlayer(Player* player) override;
    int value = 10;
};


#endif
