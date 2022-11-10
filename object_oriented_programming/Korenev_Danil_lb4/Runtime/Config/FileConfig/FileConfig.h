#ifndef LAB2_FILECONFIG_H
#define LAB2_FILECONFIG_H


#include <fstream>
#include <map>
#include "../Configuration.h"
#include "../Control.h"

class FileConfig: public Configuration{
private:
    std::fstream fileConfig;
    std::map<char, Control> settings{};
    std::map<std::string, Control> converterDataToControl = {
            {"EXIT", Control::EXIT},
            {"UP", Control::UP},
            {"DOWN", Control::DOWN},
            {"LEFT", Control::LEFT},
            {"RIGHT", Control::RIGHT},
            {"HELP", Control::HELP},
    };
public:
    explicit FileConfig(std::string filename);
    std::map<char, Control> getSettings() override;
};


#endif
