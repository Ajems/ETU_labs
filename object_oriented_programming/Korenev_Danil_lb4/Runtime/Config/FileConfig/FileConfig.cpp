#include <sstream>
#include <iostream>
#include <algorithm>
#include "FileConfig.h"

FileConfig::FileConfig(std::string fileName){
    fileConfig.open(fileName);
    if(!fileConfig.is_open())
        throw std::runtime_error("file open failure");

    std::string line;
    std::vector<std::string> list;
    while(getline(fileConfig, line)){
        std::istringstream stream(line);
        std::string key = "\0";
        std::string value = "\0";
        stream >> key;
        stream >> value;
        if (key == "\0" | value == "\0") continue;
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
