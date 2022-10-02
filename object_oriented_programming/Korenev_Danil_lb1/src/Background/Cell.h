#ifndef GAME_CELL_H
#define GAME_CELL_H


#include "Event.h"


//написать конструктор пкопирования/рисваивания для смены клетки в поле
//проверить деструктор event
class Cell{
public:
    bool isPassable() const;
    void setEvent(Event* event);
    void callEvent();
    int getId() const;
    const Cell& getCell() const;
protected:
    Event* event = nullptr;
    int id = -1;
    bool passable = false;
};


#endif //GAME_CELL_H
