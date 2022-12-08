#ifndef LAB2_CELL_H
#define LAB2_CELL_H


#include <memory>
#include "../../../Characters/Player.h"
#include "../Event/Event.h"

class Cell{
public:
    Cell(size_t value = size_t(1));
    bool isPassable() const;
    bool isStepped() const;
    void setUnstepped();
    void setStepped();
    void setEvent(Event* event);
    Event* getEvent();
    void callEvent(GameObject*);
    virtual ~Cell() = default;
    size_t hash();
protected:
    Event* event = nullptr;
    bool passable = false;
    bool stepped = false;
    size_t hashCode;
};


#endif

