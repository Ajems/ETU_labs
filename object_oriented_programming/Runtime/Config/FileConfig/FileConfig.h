#ifndef LAB2_FILECONFIG_H
#define LAB2_FILECONFIG_H


#include <fstream>
#include <map>
#include "../Configuration.h"
#include "../Control.h"

class FileConfig: public Configuration{
private:
    std::fstream fileConfig;
    std::map <char, Control> settings;
public:
    FileConfig() = default;
    ~FileConfig() override = default;
    std::map<char, Control> getSettings();
    void setConfig(std::string);
};


#endif
