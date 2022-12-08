#ifndef LAB2_EVENTFIELDSPAWNCOINS_H
#define LAB2_EVENTFIELDSPAWNCOINS_H


#include "EventField.h"

class EventFieldSpawnCoins: public EventField{
public:
    explicit EventFieldSpawnCoins(size_t value = size_t(1));
    ~EventFieldSpawnCoins() override = default;
    size_t hash() override;
private:
    size_t hashCode;
    void changeField(Field* ) override;
};

#endif
