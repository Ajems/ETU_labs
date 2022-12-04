#include "Memento.h"
#include <fstream>

void Memento::saveState(std::string state) {
    std::fstream fileSave ("save.txt");
    if (!fileSave.is_open())
        throw std::runtime_error("File save open fail");
    fileSave << state;
    fileSave.close();
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
