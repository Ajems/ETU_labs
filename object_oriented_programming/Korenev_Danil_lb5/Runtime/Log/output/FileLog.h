#ifndef LAB2_FILELOG_H
#define LAB2_FILELOG_H


#include <fstream>
#include "Logger.h"

class FileLog: public Logger {
    std::ofstream logs;
public:
    explicit FileLog(const std::string& filename = "logs.txt");
    ~FileLog() override;
    void output(Message*) override;

};


#endif
