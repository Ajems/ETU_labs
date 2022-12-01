#include "FileLog.h"
#include <iostream>


FileLog::FileLog(const std::string& filename){
    logs.open(filename, std::ofstream::out | std::ofstream::trunc);
    if(!logs.is_open())
        throw std::runtime_error("file open failure");
}

FileLog::~FileLog() {
    logs.close();
}


void FileLog::output(Message* msg) {
    if (logs.is_open())
        logs << *msg << '\n';
    else
        std::cout << "Error open logs.txt file\n";
}