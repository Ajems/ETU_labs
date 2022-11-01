#ifndef LAB2_EVENTFIELDPLAYERTELEPORT_H
#define LAB2_EVENTFIELDPLAYERTELEPORT_H


#include "EventField.h"
#include "../../Field.h"

class EventFieldPlayerTeleport: public EventField{
public:
    ~EventFieldPlayerTeleport() override = default;
private:
    void changeField(Field* ) override;
};

#endif
