#ifndef LAB2_EVENT_H
#define LAB2_EVENT_H
#include "../../../GameObject.h"
#include <string>


class Event {
protected:
    size_t hashCode;
public:
    virtual ~Event() = default;
    virtual void callReaction(GameObject*) = 0;
    virtual size_t hash() = 0;
};


#endif
