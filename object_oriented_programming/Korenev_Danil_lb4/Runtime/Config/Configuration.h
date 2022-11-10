#ifndef LAB2_CONFIGURATION_H
#define LAB2_CONFIGURATION_H


#include <string>
#include "Control.h"
#include <vector>

class Configuration {
public:
    virtual std::map<char, Control> getSettings() = 0;
};



#endif
