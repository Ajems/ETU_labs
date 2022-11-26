#ifndef LAB2_LOGPOOL_H
#define LAB2_LOGPOOL_H


#include <vector>
#include <map>
#include "../Message/Message.h"
#include "../../../Background/Data/Observer.h"
#include "../output/ConsoleLog.h"
#include "../output/FileLog.h"

class LogPool{
private:
    static LogPool *instance;
    std::vector<Logger*> loggers;
    std::map<Levels, bool> loggingLevels{
            {Levels::GameMessage, false},
            {Levels::StatusMessage, false},
            {Levels::ErrorMessage, false}
    };
public:
    static LogPool *getInstance();
    void deleteInstance();
    void deleteLoggers();
    void printLog(Message*);
    bool isLogging(Levels);
    void setStream(std::vector<std::string>);
    void setLevels(std::vector<Levels> vec);
};



#endif
