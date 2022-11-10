#include <iostream>
#include "InputKeyboard.h"

void InputKeyboard::getCommand(char &command) {
    std::cin>>command;
}

bool InputKeyboard::getAnswerLevel(std::string level) {
    std::cout << "Must log " << level << " ?\t(yes/no)\n";
    std::string answer;
    std::cin >> answer;
    return answer == "yes";
}

bool InputKeyboard::getAnswerConfig() {
    std::cout << "Would you use config file?\t(yes/no)\n";
    std::string answer;
    std::cin >> answer;
    return answer == "yes";
}

std::string InputKeyboard::readConfigName() {
    std::cout << "Enter config file name\n";
    std::string fileName;
    std::cin >> fileName;
    return fileName;
}

bool InputKeyboard::getAnswerLogger(std::string level) {
    std::cout << "Must logging " << level << " ?\t(yes/no)\n";
    std::string answer;
    std::cin >> answer;
    return answer == "yes";
}

void InputKeyboard::getValue(std::string& value) {
    std::cin >> value;
}
