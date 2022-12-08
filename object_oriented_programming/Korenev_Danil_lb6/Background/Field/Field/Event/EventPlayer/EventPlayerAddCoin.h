#ifndef LAB2_EVENTPLAYERADDCOIN_H
#define LAB2_EVENTPLAYERADDCOIN_H


#include "EventPlayer.h"

class EventPlayerAddCoin: public EventPlayer{
public:
    explicit EventPlayerAddCoin(size_t hash = size_t(1));
    ~EventPlayerAddCoin() override = default;
    size_t hash() override;
private:
    size_t hashCode;
    void changePlayer(Player*) override;
    int value = 10;
};


#endif
