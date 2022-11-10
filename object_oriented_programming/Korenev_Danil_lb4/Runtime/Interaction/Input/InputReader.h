#ifndef LAB2_INPUTREADER_H
#define LAB2_INPUTREADER_H


#include <string>

class InputReader {
public:
    virtual void getCommand(char&) = 0;
    virtual bool getAnswerLevel(std::string) = 0;
    virtual bool getAnswerConfig() = 0;
    virtual std::string readConfigName() = 0;
    virtual bool getAnswerLogger(std::string) = 0;
    virtual void getValue(std::string&) = 0;
};


#endif
