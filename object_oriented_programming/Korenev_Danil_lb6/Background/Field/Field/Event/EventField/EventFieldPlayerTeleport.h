#ifndef LAB2_EVENTFIELDPLAYERTELEPORT_H
#define LAB2_EVENTFIELDPLAYERTELEPORT_H

#include "EventField.h"

class EventFieldPlayerTeleport: public EventField{
public:
    EventFieldPlayerTeleport(int width, int height, size_t value = size_t(1));
    ~EventFieldPlayerTeleport() override = default;
    size_t hash() override;
private:
    int width, height;
    size_t hashCode;
    void changeField(Field* ) override;
};

#endif
