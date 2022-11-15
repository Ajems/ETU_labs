#include <algorithm>
#include <utility>
#include "CommandReader.h"
#include "../Log/Message/Message.h"
#include "../Log/LogPool/LogPool.h"
#include "Input/InputKeyboard/InteractionConsole.h"

#define MINSIZE 10

unsigned int CommandReader::getFieldWidth() const{
    interactionUser->showMessage("Enter filed width (minimum 10)\nWidth: ");

    std::string inputData;
    interactionUser->getValue(inputData);

    return checkUIData(inputData);
}


unsigned int CommandReader::getFieldHeight() const{
    interactionUser->showMessage("Enter filed height (minimum 10)\nheight: ");

    std::string inputData;
    interactionUser->getValue(inputData);

    return checkUIData(inputData);
}

unsigned int CommandReader::checkUIData(const std::string& input) const{
    if (isNumber(input)){
        int value = std::stoi(input);
        if (value < MINSIZE) {
            Message message = Message(Levels::ErrorMessage, "Too small value for field size");
            LogPool::getInstance()->printLog(&message);
        }
        return std::max(value, MINSIZE);
    } else {
        Message message = Message(Levels::ErrorMessage, "Incorrect data input for field size");
        LogPool::getInstance()->printLog(&message);
        return MINSIZE;
    }
};

bool CommandReader::isNumber(const std::string &s) const{
    std::string::const_iterator it = s.begin();
    while (it != s.end() && isdigit(*it)) ++it;
    return !s.empty() && it == s.end();
}

void CommandReader::notify(Control& command) {
    interactionUser->getCommand(command);
    if (command == Control::HELP){
        interactionUser->showMessage("Собирайте монеты для победы");
    }
}

std::vector<std::string> CommandReader::readLevels() {
    interactionUser->showMessage("What max levels must log? (error, status, game)");
    std::vector<std::string> levels;
    if(!getAnswerLevel("error"))
        return levels;

    levels.push_back("error");
    if (!getAnswerLevel("status"))
        return levels;

    levels.push_back("status");
    if(!getAnswerLevel("game"))
        return levels;

    levels.push_back("game");
    return levels;
}

bool CommandReader::getAnswerLevel(std::string level) {
    return interactionUser->getAnswerLevel(std::move(level));
}

std::vector<std::string> CommandReader::readLoggers() {
    std::vector<std::string> outPut;
    for(const auto& type : loggers){
        if(getAnswerLogger(type)) outPut.push_back(type);
    }
    return outPut;
}

bool CommandReader::getAnswerLogger(std::string level) {
    return interactionUser->getAnswerLogger(std::move(level));
}

CommandReader::CommandReader() {
    interactionUser = new InteractionConsole;
}

CommandReader::~CommandReader() {
    delete interactionUser;
}

void CommandReader::setConfig() {
    interactionUser->setConfig();
}
