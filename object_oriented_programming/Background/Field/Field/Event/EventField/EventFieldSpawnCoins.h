#ifndef LAB2_EVENTFIELDSPAWNCOINS_H
#define LAB2_EVENTFIELDSPAWNCOINS_H


#include "EventField.h"
#include "../../Field.h"

class EventFieldSpawnCoins: public EventField{
public:
    ~EventFieldSpawnCoins() override = default;
private:
    void changeField(Field* ) override;
};

#endif
