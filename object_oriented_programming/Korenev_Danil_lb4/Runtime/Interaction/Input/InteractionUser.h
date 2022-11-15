#ifndef LAB2_INTERACTIONUSER_H
#define LAB2_INTERACTIONUSER_H


#include <string>
#include "../../Config/FileConfig/FileConfig.h"

class InteractionUser {
public:
    virtual void getCommand(Control&) = 0;
    virtual bool getAnswerLevel(std::string) = 0;
    virtual bool getAnswerConfig() = 0;
    virtual bool getAnswerLogger(std::string) = 0;
    virtual void getValue(std::string&) = 0;
    virtual void setConfig() = 0;
    virtual void showMessage(std::string) = 0;
    FileConfig* config = nullptr;
    virtual ~InteractionUser() = default;
};


#endif
