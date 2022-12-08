#include "Memento.h"
#include <fstream>
#include <iostream>

void Memento::saveState(std::string state, std::string filename) {
    std::fstream fileSave;
    fileSave.open(filename, std::ios::out);
    if (!fileSave.is_open())
        throw std::runtime_error("File save open fail");

    fileSave << state;
    fileSave.close();
}

std::string Memento::restoreState(std::string filename) {
    std::fstream fileSave;
    fileSave.open(filename);
    if(!fileSave.is_open())
        throw std::runtime_error("File save open fail");
    std::string data;
    std::string line;
    while (getline(fileSave, line)){
        data+=line;
        data+="\n";
    }
    return data;
}
