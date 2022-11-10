#ifndef LAB2_EVENTFIELD_H
#define LAB2_EVENTFIELD_H

class Field;
#include <string>
#include "../Event.h"

class EventField: public Event {
    void callReaction(GameObject*) override;
    virtual void changeField(Field*) = 0;
};


#endif