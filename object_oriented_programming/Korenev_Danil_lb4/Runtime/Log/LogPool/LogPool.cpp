#include <algorithm>
#include <iostream>
#include "LogPool.h"


void LogPool::printLog(Message *msg) {
    if(isLogging(msg->getLevel())){
        for(auto stream: loggers){
            stream->output(msg);
        }
    }
}

void LogPool::setLevels(std::vector<Levels> levels) {
    for (auto level : loggingLevels)
        loggingLevels.at(level.first) = false;

    for (auto level : levels)
        loggingLevels.at(level) = true;
}

bool LogPool::isLogging(Levels level) {
    if(loggingLevels.find(level) != loggingLevels.end())
        return loggingLevels.at(level);
    return false;
}

LogPool *LogPool::instance = nullptr;

LogPool *LogPool::getInstance(){
    if(!instance)
        instance = new LogPool;
    return instance;
}

void LogPool::setStream(std::vector<std::string> stream) {
    for(auto output: stream){
        if (output == "console"){
            loggers.push_back(new ConsoleLog());
        } else if(output == "file"){
            loggers.push_back(new FileLog());
        }
    }
}

void LogPool::deleteLoggers() {
    for(auto logger: loggers){
        delete logger;
    }
}

void LogPool::deleteInstance() {
    delete instance;
}