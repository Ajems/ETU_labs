#include <iostream>
#include <algorithm>
#include "CommandReader.h"
#include "../Log/Message/Message.h"
#include "../Log/LogPool/LogPool.h"

#define MINSIZE 10


unsigned int CommandReader::getFieldWidth() const{
    std::cout << "Enter filed width (minimum 10)\n";
    std::cout << "Width: ";
    std::string inputData;

    std::cin >> inputData;
    return checkUIData(inputData);
}


unsigned int CommandReader::getFieldHeight() const{
    std::cout << "Enter filed Height (minimum 10)\n";
    std::cout << "Height: ";
    std::string inputData;

    std::cin >> inputData;
    return checkUIData(inputData);
}

void CommandReader::getPlayerMove(char& command) const {
    std::cin >> command;
};

unsigned int CommandReader::checkUIData(const std::string& input) const{
    if (isNumber(input)){
        int value = std::stoi(input);
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

void CommandReader::notify(char& command) {
    getPlayerMove(command);
}

std::vector<std::string> CommandReader::readLevels() {
    std::cout << "What max levels must log? (error, status, game)\n";
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
    std::cout << "Must log " << level << " ?\n(yes/no)\n";
    std::string answer;
    std::cin >> answer;
    return answer == "yes";
}

std::vector<std::string> CommandReader::readLoggers() {
    std::vector<std::string> logger = {"console", "file"};
    std::vector<std::string> outPut;
    for(auto type : logger){
        if(getAnswerLogger(type)) outPut.push_back(type);
    }
    return outPut;
}

bool CommandReader::getAnswerLogger(std::string level) {
    std::cout << "Must logging " << level << " ?\n(yes/no)\n";
    std::string answer;
    std::cin >> answer;
    return answer == "yes";
}