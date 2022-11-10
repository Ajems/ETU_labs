#include <sstream>
#include <iostream>
#include <algorithm>
#include "FileConfig.h"

FileConfig::FileConfig(std::string fileName){
    fileConfig.open(fileName);
    if(!fileConfig.is_open())
        throw std::runtime_error("file open failure");

    std::string line;
    std::string key;
    std::string value;
    std::vector<std::string> list;
    while(getline(fileConfig, line)){
        std::istringstream stream(line);
        stream >> key;
        stream >> value;
        if (value[0] == 'e') continue;
        if (settings.find(value[0]) != settings.end()) continue;
        if (std::count(list.begin(), list.end(), key)) continue;
        if (converterDataToControl.find(key) == converterDataToControl.end()) continue;
        settings.insert({ value[0], converterDataToControl.at(key)});
        list.push_back(key);
    }
    fileConfig.close();
}

std::map<char, Control> FileConfig::getSettings() {
    return settings;
}
