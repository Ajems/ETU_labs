#ifndef LAB2_EVENTPLAYERTAKEDAMAGE_H
#define LAB2_EVENTPLAYERTAKEDAMAGE_H

#include "EventPlayer.h"

class EventPlayerTakeDamage: public EventPlayer{
public:
    explicit EventPlayerTakeDamage(size_t hash = size_t(1));
    ~EventPlayerTakeDamage() override = default;
    size_t hash() override;
private:
    size_t hashCode;
    void changePlayer(Player* player) override;
    int value = 10;
};


#endif
