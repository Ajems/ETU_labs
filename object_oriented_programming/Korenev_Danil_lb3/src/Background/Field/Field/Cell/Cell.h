#ifndef LAB2_CELL_H
#define LAB2_CELL_H


#include <memory>
#include "../../../Characters/Player.h"
#include "../Event/Event.h"

class Cell{
public:
    bool isPassable() const;
    bool isStepped() const;
    void setUnstepped();
    void setStepped();
    void setEvent(Event* event);
    Event* getEvent();
    void callEvent(GameObject*);
protected:
    Event* event = nullptr;
    bool passable = false;
    bool stepped = false;
};


#endif

