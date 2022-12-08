#include "EventFieldPlayerTeleport.h"
#include "../../../../../Runtime/Log/Message/Message.h"
#include "../../../../../Runtime/Log/LogPool/LogPool.h"
#include "../../Field.h"

void EventFieldPlayerTeleport::changeField(Field *field) {
    std::pair<int, int> tmpPosition(width, height);
    try {
        if (field->getCell(tmpPosition).isPassable()) {
            field->changePlayerPosition(tmpPosition);
            field->callEvent(nullptr, tmpPosition);
        }
    } catch (...) {
        Message message = Message(Levels::ErrorMessage, "Could not set event teleport");
        LogPool::getInstance()->printLog(&message);
    }
}

EventFieldPlayerTeleport::EventFieldPlayerTeleport(int width, int height, size_t value):
width(width), height(height), hashCode(value) {}

size_t EventFieldPlayerTeleport::hash() {
    return hashCode;
}
