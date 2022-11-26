#include "Cell.h"
#include "../../../../Runtime/Log/Levels.h"
#include "../../../../Runtime/Log/LogPool/LogPool.h"


bool Cell::isPassable() const {
    return passable;
}

bool Cell::isStepped() const {
    return stepped;
}

void Cell::setUnstepped(){
    stepped = false;
    passable = true;
};

void Cell::setStepped(){
    stepped = true;
};

void Cell::setEvent(Event* event){
    if (this->event != nullptr and passable)
        delete this->event;
    this->event = event;
    Message message = Message(Levels::GameMessage, "Set event to cell");
    LogPool::getInstance()->printLog(&message);
}

Event* Cell::getEvent(){
    return event;
}

void Cell::callEvent(GameObject* obj){
    if (event != nullptr)
        event->callReaction(obj);
        event = nullptr;
}