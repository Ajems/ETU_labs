#ifndef LAB2_CONTROLLER_H
#define LAB2_CONTROLLER_H


#include <utility>
#include "MediatorObject.h"
#include "string"
#include "../../Background/Data/Model.h"
#include "../../Background/Field/View/FieldView.h"
#include "../Config/Configuration.h"

class Controller: public MediatorObject{
private:
    Model model;
    FieldView fieldView;
    std::map<Control, std::string> converterControlToString = {
            {Control::EXIT, "EXIT"},
            {Control::UP, "UP"},
            {Control::DOWN, "DOWN"},
            {Control::LEFT, "LEFT"},
            {Control::RIGHT, "RIGHT"},
            {Control::HELP, "HELP"},
    };
    std::map<Control, std::function<void()>> interaction = {
            {Control::EXIT, [this](){model.setEndGame();}},
            {Control::SAVE, [this](){model.saveGame();}},
            {Control::RESTORE, [this](){model.restoreGame();}}
    };
public:
    Controller(std::string);
    void notify(Control&) final;
    bool isEndGame();
};


#endif
