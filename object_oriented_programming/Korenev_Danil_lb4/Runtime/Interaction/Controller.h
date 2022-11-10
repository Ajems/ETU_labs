#ifndef LAB2_CONTROLLER_H
#define LAB2_CONTROLLER_H


#include <utility>
#include "MediatorObject.h"
#include "string"
#include "../../Background/Data/Model.h"
#include "../../Background/Field/View/FieldView.h"
#include "../Config/Configuration.h"

class Controller: public MediatorObject{
public:
    Controller(std::pair<int, int> = std::pair<int, int>{10, 10});
    void notify(char&) final;
    bool isEndGame();
    void printHelp();
    void setConfig(Configuration*);
private:
    Model model;
    FieldView fieldView;
    std::map<char, Control> settings = {
            {'e', Control::EXIT},
            {'w', Control::UP},
            {'s', Control::DOWN},
            {'a', Control::LEFT},
            {'d', Control::RIGHT},
            {'h', Control::HELP},
    };

    std::map<Control, std::string> converterControlToString = {
            {Control::EXIT, "EXIT"},
            {Control::UP, "UP"},
            {Control::DOWN, "DOWN"},
            {Control::LEFT, "LEFT"},
            {Control::RIGHT, "RIGHT"},
            {Control::HELP, "HELP"},
    };
};


#endif
