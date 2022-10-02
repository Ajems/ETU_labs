#include <iostream>
#include <algorithm>
#include "CommandReader.h"
#define MINSIZE 10


unsigned int CommandReader::getFieldWidth() const{
    std::cout << "Enter filed width (minimum 10)\n";
    std::cout << "Width: ";
    std::string inputData;

    std::cin >> inputData;
    return CommandReader::checkUIData(inputData);
}


unsigned int CommandReader::getFieldHeight() const{
    std::cout << "Enter filed Height (minimum 10)\n";
    std::cout << "Height: ";
    std::string inputData;

    std::cin >> inputData;
    return CommandReader::checkUIData(inputData);
}

void CommandReader::getPlayerMove(char& command) const {
    std::cin >> command;
};

unsigned int CommandReader::checkUIData(const std::string& input) const{
    if (isNumber(input)){
        int value = std::stoi(input);
        return std::max(value, MINSIZE);
    } else {
        std::cout << "Incorrect value!\nDefault value is used\n";
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
