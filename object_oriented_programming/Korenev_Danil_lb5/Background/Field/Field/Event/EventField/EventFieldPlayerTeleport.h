#ifndef LAB2_EVENTFIELDPLAYERTELEPORT_H
#define LAB2_EVENTFIELDPLAYERTELEPORT_H


#include "EventField.h"
#include "../../Field.h"

class EventFieldPlayerTeleport: public EventField{
public:
    EventFieldPlayerTeleport(int width, int height);
    ~EventFieldPlayerTeleport() override = default;
private:
    int width, height;
    void changeField(Field* ) override;
};

#endif
