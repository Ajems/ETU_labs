#ifndef LAB2_EVENT_H
#define LAB2_EVENT_H
#include "../../../GameObject.h"


class Event {
public:
    virtual ~Event() = default;
    virtual void callReaction(GameObject*) = 0;
};


#endif
