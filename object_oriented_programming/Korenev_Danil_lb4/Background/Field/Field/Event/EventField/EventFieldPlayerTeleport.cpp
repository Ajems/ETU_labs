#include "EventFieldPlayerTeleport.h"

void EventFieldPlayerTeleport::changeField(Field *field) {
    std::pair<int, int> player_position =  field->getPlayerPosition();
    std::pair<int, int> tmpPosition(field->getFieldSize().first-player_position.first-1, field->getFieldSize().second-player_position.second-1);
    if (field->getCell(tmpPosition).isPassable()){
        field->setPlayerPosition(tmpPosition);
    }
}

