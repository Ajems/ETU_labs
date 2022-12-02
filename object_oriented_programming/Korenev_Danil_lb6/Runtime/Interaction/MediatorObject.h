#ifndef LAB2_MEDIATOROBJECT_H
#define LAB2_MEDIATOROBJECT_H


#include "../Config/Control.h"

class MediatorObject {
public:
    virtual void notify(Control&) = 0;
};


#endif
