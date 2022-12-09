#ifndef LAB2_ORIGINATOR_H
#define LAB2_ORIGINATOR_H

#include "../Memento/Memento.h"

class Originator {
public:
    virtual Memento saveState() = 0;
    virtual void restoreState(Memento) = 0;
    virtual void restoreCorrectState() = 0;

};


#endif
