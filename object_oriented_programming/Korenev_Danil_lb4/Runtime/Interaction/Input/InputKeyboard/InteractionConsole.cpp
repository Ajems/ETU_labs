#include <iostream>
#include "InteractionConsole.h"

void InteractionConsole::getCommand(Control& command) {
    char input;
    std::cin>>input;
    command = convertInput(input);
}

Control InteractionConsole::convertInput(char command) {
    if(settings.find(command) != settings.end()){
        return settings.at(command);
    }
    return Control::NOTHING;
}

bool InteractionConsole::getAnswerLevel(std::string level) {
    std::cout << "Must log " << level << " ?\t(yes/no)\n";
    std::string answer;
    std::cin >> answer;
    return answer == "yes";
}

bool InteractionConsole::getAnswerConfig() {
    std::cout << "Would you use config file?\t(yes/no)\n";
    std::string answer;
    std::cin >> answer;
    return answer == "yes";
}

bool InteractionConsole::getAnswerLogger(std::string level) {
    std::cout << "Must logging " << level << " ?\t(yes/no)\n";
    std::string answer;
    std::cin >> answer;
    return answer == "yes";
}

void InteractionConsole::getValue(std::string& value) {
    std::cin >> value;
}

void InteractionConsole::setConfig() {
    if (getAnswerConfig()){
        config = new FileConfig();
        showMessage("Название файла");
        std::string fileName;
        std::cin >> fileName;
        try {
            config->setConfig(fileName);
        } catch (std::runtime_error){
            showMessage("Ошибка открытия файла");
        }
    }
    std::map <char, Control> newSettings = config->getSettings();
    if (newSettings.size() == settings.size()){
        settings = newSettings;
    }
}

void InteractionConsole::showMessage(std::string msg) {
    std::cout << msg << '\n';
}
