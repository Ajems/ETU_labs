#ifndef LAB2_MESSAGE_H
#define LAB2_MESSAGE_H


#include <ostream>
#include <map>
#include "../Levels.h"

class Message {
private:
    std::string message;
    Levels level;
    std::string timeMessage;
    std::string getTime();
    std::map<Levels, std::string> prefixs {
            {Levels::GameMessage, "[GameOBJECT]"},
            {Levels::StatusMessage, "[STATUS]"},
            {Levels::ErrorMessage, "[ERROR]"}
    };
public:
    Message(Levels, std::string msg);
    Levels getLevel();
    std::string getMessage();
    friend std::ostream& operator<<(std::ostream&, Message&);
};


#endif
