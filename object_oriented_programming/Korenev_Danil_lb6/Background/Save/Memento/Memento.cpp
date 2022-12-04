#include "Memento.h"
#include <fstream>
#include <iostream>

void Memento::saveState(std::string state) {
    std::fstream fileSave;
    fileSave.open("save.txt", std::ios::out);
    if (!fileSave.is_open())
        throw std::runtime_error("File save open fail");

    fileSave << state;
    fileSave.close();
    std::cout << "FILE SAVE SAVE\n";
}

std::string Memento::restoreState() {
    std::fstream fileSave;
    fileSave.open("save.txt");
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
