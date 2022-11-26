#ifndef LAB2_INTERACTIONCONSOLE_H
#define LAB2_INTERACTIONCONSOLE_H


#include "../InteractionUser.h"
#include "../../../Config/Control.h"

class InteractionConsole: public  InteractionUser{
private:
    std::map<char, Control> settings = {
            {'e', Control::EXIT},
            {'w', Control::UP},
            {'s', Control::DOWN},
            {'a', Control::LEFT},
            {'d', Control::RIGHT},
            {'h', Control::HELP},
    };
public:
    void getCommand(Control&);
    Control convertInput(char);
    bool getAnswerLevel(std::string) override;
    bool getAnswerConfig() override;
    bool getAnswerLogger(std::string) override;
    void getValue(std::string&) override;
    void setConfig() override;
    void showMessage(std::string) override;
    std::string chooseLevel() override;
    ~InteractionConsole() override = default;
};


#endif
