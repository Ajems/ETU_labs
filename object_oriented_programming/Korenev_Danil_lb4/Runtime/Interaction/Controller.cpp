#include <iostream>
#include <fstream>
#include "Controller.h"

Controller::Controller(std::pair<int, int> size): fieldView(FieldView(&model)), model(Model(size)){};

void Controller::notify(char& command) {
    Control reaction = Control::NOTHING;
    if (settings.find(command) != settings.end()){
        reaction = settings.at(command);
    }

    switch (reaction) {
        case EXIT:
            model.setEndGame();
            break;
        case HELP:
            printHelp();
            break;
        default:
            model.movePlayerPosition(reaction);
            break;
    }
}

bool Controller::isEndGame(){
    return model.isEndGame();
}

void Controller::setConfig(Configuration* configuration) {
    std::map<char, Control> newSettings = configuration->getSettings();
    if(newSettings.size() == settings.size()) settings = newSettings;
}

void Controller::printHelp() {
    std::cout << "Your config\n";
    for (auto const& [key, val] : settings){
        std::cout << key << ':' << converterControlToString.at(settings.at(key)) << std::endl;
    }
}
