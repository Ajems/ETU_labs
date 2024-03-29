#ifndef LAB2_COMMANDREADER_H
#define LAB2_COMMANDREADER_H
#include "string"
#include "MediatorObject.h"
#include <vector>

class CommandReader: public MediatorObject{
public:
    unsigned int getFieldWidth() const;
    unsigned int getFieldHeight() const;
    void notify(char&) final;
    std::vector<std::string> readLoggers();
    std::vector<std::string> readLevels();
    bool getAnswerLevel(std::string);
    bool getAnswerLogger(std::string);
private:
    unsigned int checkUIData(const std::string& input) const;
    bool isNumber(const std::string& s) const;
    void getPlayerMove(char&) const;
};


#endif