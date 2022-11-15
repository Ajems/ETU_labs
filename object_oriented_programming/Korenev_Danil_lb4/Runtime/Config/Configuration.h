#ifndef LAB2_CONFIGURATION_H
#define LAB2_CONFIGURATION_H


#include <string>
#include "Control.h"
#include <vector>

class Configuration {
public:
    virtual ~Configuration() = default;
    std::map<std::string, Control> converterDataToControl = {
            {"EXIT", Control::EXIT},
            {"UP", Control::UP},
            {"DOWN", Control::DOWN},
            {"LEFT", Control::LEFT},
            {"RIGHT", Control::RIGHT},
            {"HELP", Control::HELP}
    };
};



#endif
