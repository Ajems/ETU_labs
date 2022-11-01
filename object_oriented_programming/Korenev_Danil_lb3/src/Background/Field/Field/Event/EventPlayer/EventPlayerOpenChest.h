#ifndef LAB2_EVENTPLAYEROPENCHEST_H
#define LAB2_EVENTPLAYEROPENCHEST_H


#include "EventPlayer.h"

class EventPlayerOpenChest: public EventPlayer{
public:
    explicit EventPlayerOpenChest();
    ~EventPlayerOpenChest() override = default;
private:
    void changePlayer(Player* player) override;
    int value;
};



#endif
