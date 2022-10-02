#ifndef GAME_COMMANDREADER_H
#define GAME_COMMANDREADER_H
#include "string"

#include "MediatorObject.h"

class CommandReader: public MediatorObject{
public:
    unsigned int getFieldWidth() const;
    unsigned int getFieldHeight() const;
    void notify(char&) final;
private:
    unsigned int checkUIData(const std::string& input) const;
    bool isNumber(const std::string& s) const;
    void getPlayerMove(char&) const;
};


#endif
