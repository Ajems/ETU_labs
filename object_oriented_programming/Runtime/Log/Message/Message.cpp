#include "Message.h"

#include <utility>

Message::Message(Levels level, std::string msg): level(level), message(std::move(msg)) {
    time_t seconds = time(nullptr);
    tm* timeInfo = localtime(&seconds);
    std::string temp = asctime(timeInfo);
    temp.pop_back();
    timeMessage = temp;
}

Levels Message::getLevel() {
    return level;
}

std::string Message::getMessage() {
    return message;
}

std::string Message::getTime() {
    return timeMessage;
}

std::ostream& operator<<(std::ostream& out, Message& message){
    out << message.prefixs.at(message.getLevel()) << '\t' << message.getTime() << ": " << message.getMessage();
    return out;
}

