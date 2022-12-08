#ifndef LAB2_EVENTPLAYEROPENCHEST_H
#define LAB2_EVENTPLAYEROPENCHEST_H


#include "EventPlayer.h"

class EventPlayerOpenChest: public EventPlayer{
public:
    explicit EventPlayerOpenChest(size_t hash = size_t(1));
    ~EventPlayerOpenChest() override = default;
    size_t hash() override;
private:
    size_t hashCode;
    void changePlayer(Player* player) override;
    int value = 10;
};



#endif
