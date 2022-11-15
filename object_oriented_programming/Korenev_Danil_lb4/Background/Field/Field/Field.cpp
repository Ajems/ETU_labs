#include <iostream>
#include <utility>
#include "Field.h"
#include "Event/EventPlayer/EventPlayerAddCoin.h"
#include "Event/EventPlayer/EventPlayerAddShield.h"
#include "Event/EventPlayer/EventPlayerTakeDamage.h"
#include "Event/EventField/EventFieldCrashWall.h"
#include "Event/EventPlayer/EventPlayerOpenChest.h"
#include "Event/EventField/EventFieldPlayerTeleport.h"
#include "../../../Runtime/Log/Levels.h"
#include "../../../Runtime/Log/LogPool/LogPool.h"


Field::Field(std::pair<int, int> fieldSize, std::pair<int, int> playerPosition):fieldSize(std::move(fieldSize)),playerPosition(std::move(playerPosition)){
    setField();
};

Field::Field(const Field& fieldObj):
        fieldSize(fieldObj.fieldSize),
        playerPosition(fieldObj.playerPosition){
    for (int h = 0; h != fieldSize.second; ++h){
        field.emplace_back();
        for (int w = 0; w != fieldSize.first; ++w){
            field.at(h).at(w) = fieldObj.field.at(h).at(w);
        }
    }
};

void Field::swap(Field &fieldObj){
    std::swap(fieldSize, fieldObj.fieldSize);
    std::swap(field, fieldObj.field);
    std::swap(playerPosition, fieldObj.playerPosition);
}

Field& Field::operator=(const Field& fieldObj){
    if(this != &fieldObj){
        Field(fieldObj).swap(*this);
    }
    return *this;
}

Field::Field(Field&& fieldObj){
    this->swap(fieldObj);
};

Field& Field::operator=(Field&& filedObj) {
    if (this != &filedObj)
        this->swap(filedObj);
    return *this;
}


void Field::setField(){
    exitPosition = std::pair<int, int>({fieldSize.first-1 ,fieldSize.second-1});
    for(int h = 0; h < fieldSize.second; ++h){
        field.emplace_back();
        for(int w = 0; w < fieldSize.first; ++w){
            if (10 <= h + w and h + w <= 11){
                auto cellWall = cellFactory.getCell("Wall");
                field.at(h).push_back(cellWall);
            }else {
                auto cellGrass = cellFactory.getCell("Grass");
                field.at(h).push_back(cellGrass);
            }
            if (h+w == 3){
                auto addHealth = new EventPlayerTakeDamage(35);
                field.at(h).at(w).setEvent(addHealth);
            }

            if (h + w == 9){
                auto crashWall = new EventFieldCrashWall();
                field.at(h).at(w).setEvent(crashWall);
            }
            if (h + w == 12){
                auto takeDamage = new EventPlayerTakeDamage(2*(h+w));
                field.at(h).at(w).setEvent(takeDamage);
            }
            if (h == fieldSize.second - 3){
                auto addCoin = new EventPlayerAddCoin(10);
                field.at(h).at(w).setEvent(addCoin);
            }
            if (w == fieldSize.first - 3){
                auto addShield = new EventPlayerAddShield(10);
                field.at(h).at(w).setEvent(addShield);
            }
            if(w == 9 and h == 9){
                auto openChest = new EventPlayerOpenChest();
                field.at(h).at(w).setEvent(openChest);
            }
            if(w == 5 and h == 1){
                auto playerTeleport = new EventFieldPlayerTeleport();
                field.at(h).at(w).setEvent(playerTeleport);
            }
            if (h == playerPosition.second and w == playerPosition.first) field.at(h).at(w) = cellFactory.getCell("Player");
        }
    }
};

void Field::setCell(std::pair<int, int> position, std::string type) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first and position != playerPosition){
        auto tmpEvent = field.at(position.second).at(position.first).getEvent();
        field.at(position.second).at(position.first) = cellFactory.getCell(type);
        Message message = Message(Levels::GameMessage, "Set cell on field: " + type);
        LogPool::getInstance()->printLog(&message);

        field.at(position.second).at(position.first).setEvent(tmpEvent);
    }
}

Cell &Field::getCell(std::pair<int, int> position){
    return field.at(position.second).at(position.first);
}

void Field::setPlayerPosition(std::pair<int, int> newPosition) {
    if (field.at(newPosition.second).at(newPosition.first).isPassable()){
        field.at(playerPosition.second).at(playerPosition.first).setUnstepped();
        field.at(newPosition.second).at(newPosition.first).setStepped();
        playerPosition = newPosition;
        Message message = Message(Levels::GameMessage, "Player moved to (" + std::to_string(playerPosition.first) + ", " + std::to_string(playerPosition.second) + ')');
        LogPool::getInstance()->printLog(&message);
    } else {
        Message message = Message(Levels::ErrorMessage, "Player tried to step on the wall");
        LogPool::getInstance()->printLog(&message);
    }
}

std::pair<int, int> Field::getFieldSize() const{
    return fieldSize;
};


void Field::movePlayer(Control step) {

    newPosition = playerPosition;
    if (reaction.find(step) == reaction.end()) return;
    reaction.at(static_cast<const Control>(step))();

    newPosition.first%=int(fieldSize.first);
    if(newPosition.first < 0) newPosition.first += int(fieldSize.first);

    newPosition.second%=int(fieldSize.second);
    if(newPosition.second < 0) newPosition.second += int(fieldSize.second);

    setPlayerPosition(newPosition);
}

void Field::callEvent(Player *player, std::pair<int, int> position) {
    if (dynamic_cast<EventPlayer*>(getCell(position).getEvent())){
        getCell(position).callEvent(player);
    }else if(dynamic_cast<EventField*>(getCell(position).getEvent())){
        getCell(position).callEvent(this);
    }
}

std::pair<int, int> Field::getPlayerPosition() const {
    return playerPosition;
}

std::pair<int, int> Field::getExitPosition() const {
    return exitPosition;
}





