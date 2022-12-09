#include "Memento.h"
#include "../../../Runtime/Exceptions/SaveExceptions/SaveStateException.h"
#include "../../../Runtime/Exceptions/SaveExceptions/RestoreStateException.h"
#include "../../../Runtime/Exceptions/SaveExceptions/OpenFileException.h"
#include <fstream>
#include <iostream>

void Memento::saveState(const std::string& state, const std::string& filename) {
    std::fstream fileSave;
    fileSave.open(filename, std::ios::out);
    if (!fileSave.is_open())
        throw SaveStateException("could not open file [ " + filename + " ] for save state");
    fileSave << state;
    fileSave.close();
}

std::string Memento::restoreState(const std::string& filename) {
    std::fstream fileSave;
    fileSave.open(filename);
    if(!fileSave.is_open())
        throw OpenFileException("could not open file [ " + filename + " ] for restore state");
    std::string data;
    std::string line;
    while (getline(fileSave, line)){
        data+=line;
        data+="\n";
    }
    return data;
}
