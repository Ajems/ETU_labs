#ifndef LAB2_ORIGINATOR_H
#define LAB2_ORIGINATOR_H

#include "../Memento/Memento.h"
#include "../../GameObject.h"

//создает объект хранителя для сохранения своего состояния
class Originator {
public:
    virtual Memento saveState() = 0; // создание memento по своим правилам
    virtual void restoreState(Memento) = 0; // создание/изменение себя(filed/player)
                                            // по восстановлению из memento данных
};


#endif
