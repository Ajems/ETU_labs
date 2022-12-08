#ifndef LAB2_EVENTFIELDCRASHWALL_H
#define LAB2_EVENTFIELDCRASHWALL_H

#include "EventField.h"


class EventFieldCrashWall: public EventField{
public:
    explicit EventFieldCrashWall(size_t value = size_t(1));
    ~EventFieldCrashWall() override = default;
    size_t hash() override;
private:
    size_t hashCode;
    void changeField(Field*) override;
};


#endif
