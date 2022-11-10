#ifndef LAB2_INPUTKEYBOARD_H
#define LAB2_INPUTKEYBOARD_H


#include "../InputReader.h"

class InputKeyboard: public  InputReader{
public:
    void getCommand(char &) override;
    bool getAnswerLevel(std::string) override;
    bool getAnswerConfig() override;
    std::string readConfigName() override;
    bool getAnswerLogger(std::string) override;
    void getValue(std::string&) override;
};


#endif
