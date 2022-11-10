#ifndef LAB2_OBSERVABLE_H
#define LAB2_OBSERVABLE_H


#include "Observer.h"

class Observable{
    Observer* observer;
public:
    Observable();
    void setObserver(Observer* observer);
    void notify();
};


#endif
