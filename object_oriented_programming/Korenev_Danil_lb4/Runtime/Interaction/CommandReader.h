#ifndef LAB2_COMMANDREADER_H
#define LAB2_COMMANDREADER_H
#include "string"
#include "MediatorObject.h"
#include "Input/InteractionUser.h"
#include <vector>

class CommandReader: public MediatorObject{
public:
    unsigned int getFieldWidth() const;
    unsigned int getFieldHeight() const;
    void notify(Control&) final;
    std::vector<std::string> readLoggers();
    std::vector<std::string> readLevels();
    bool getAnswerLevel(std::string);
    bool getAnswerLogger(std::string);
    void setConfig();
    CommandReader();
    ~CommandReader();
private:
    unsigned int checkUIData(const std::string& input) const;
    bool isNumber(const std::string& s) const;
    InteractionUser* interactionUser;
    std::vector<std::string> loggers = {"console", "file"};
};


#endif