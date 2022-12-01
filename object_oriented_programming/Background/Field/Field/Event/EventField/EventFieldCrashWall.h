#ifndef LAB2_EVENTFIELDCRASHWALL_H
#define LAB2_EVENTFIELDCRASHWALL_H


#include "EventField.h"
#include "../../Field.h"

class EventFieldCrashWall: public EventField{
public:
    ~EventFieldCrashWall() override = default;
private:
    void changeField(Field*) override;
};


#endif
