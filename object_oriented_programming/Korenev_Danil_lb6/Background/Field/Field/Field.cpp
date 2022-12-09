#include <utility>
#include <iostream>
#include <sstream>
#include "Field.h"
#include "Event/EventPlayer/EventPlayerAddCoin.h"
#include "Event/EventField/EventFieldCrashWall.h"
#include "../../../Runtime/Log/Levels.h"
#include "../../../Runtime/Log/LogPool/LogPool.h"
#include "../../../Runtime/Exceptions/SaveExceptions/RestoreStateException.h"
#include "../../../Runtime/Exceptions/SaveExceptions/OpenFileException.h"

#define SAVEFILE "field_save.txt"
#define TOTALFIELDINTPARAMS 7
#define INDEXSIZE 0
#define INDEXPLAYERPOSITION 2
#define INDEXFINISHPOSITION 4
#define INDEXTOTALCOINS 6



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

void Field::changeCell(std::pair<int, int> position, std::string type) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first and position != playerPosition){
        auto tmpEvent = field.at(position.second).at(position.first).getEvent();
        field.at(position.second).at(position.first) = cellFactory.getCell(type);
        Message message = Message(Levels::GameMessage, "Set cell on field");
        LogPool::getInstance()->printLog(&message);

        field.at(position.second).at(position.first).setEvent(tmpEvent);
    }
}

void Field::changeCell(std::pair<int, int> position, Cell *cell) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first and position != playerPosition){
        auto tmpEvent = field.at(position.second).at(position.first).getEvent();
        field.at(position.second).at(position.first) = *cell;
        Message message = Message(Levels::GameMessage, "Set cell on field");
        LogPool::getInstance()->printLog(&message);
        field.at(position.second).at(position.first).setEvent(tmpEvent);
    }
}

void Field::setCell(std::pair<int, int> position, std::string type) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first){
        try {
            if (dynamic_cast<CellPlayer *>(&this->getCell(position))) return;
            field.at(position.second).at(position.first) = cellFactory.getCell(type);
            Message message = Message(Levels::GameMessage, "Set cell on field");
            LogPool::getInstance()->printLog(&message);
        }catch (...){
            Message message = Message(Levels::ErrorMessage, "Could not set cell on field");
            LogPool::getInstance()->printLog(&message);
        }
    } else {
        throw std::invalid_argument("Position out of field");
    }
}


Cell &Field::getCell(std::pair<int, int> position){
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first){
        return field.at(position.second).at(position.first);
    }
    throw std::invalid_argument("Incorrect cell position");
}

void Field::changePlayerPosition(std::pair<int, int> newPosition) {
    try{
        if (getCell(newPosition).isPassable()){
            getCell(playerPosition).setUnstepped();
            field.at(playerPosition.second).at(playerPosition.first) = cellFactory.getCell("Grass");
            getCell(newPosition).setStepped();
            playerPosition = std::move(newPosition);
            Event* tmpEvent = field.at(playerPosition.second).at(playerPosition.first).getEvent();
            field.at(playerPosition.second).at(playerPosition.first) = cellFactory.getCell("Player");
            field.at(playerPosition.second).at(playerPosition.first).setEvent(tmpEvent);
            Message message = Message(Levels::GameMessage, "Player moved to (" + std::to_string(playerPosition.first) + ", " + std::to_string(playerPosition.second) + ')');
            LogPool::getInstance()->printLog(&message);
        } else {
            Message message = Message(Levels::ErrorMessage, "Player tried to step on the wall");
            LogPool::getInstance()->printLog(&message);
        }
    } catch (...) {
        Message message = Message(Levels::ErrorMessage, "Could not step");
        LogPool::getInstance()->printLog(&message);
    }
}

void Field::setPlayerPosition(std::pair<int, int> newPosition) {
    playerPosition = newPosition;
    if (finishPosition.first == -1 || finishPosition.second == -1) setFinishPosition(playerPosition);
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

    changePlayerPosition(newPosition);
}

void Field::callEvent(Player *player, std::pair<int, int> position) {
    if (player == nullptr) player = this->player;
    try{
        if (dynamic_cast<EventPlayer*>(getCell(position).getEvent())){
            getCell(position).callEvent(player);
        }else if(dynamic_cast<EventField*>(getCell(position).getEvent())){
            getCell(position).callEvent(this);
        }
    }catch (...){
        Message message = Message(Levels::ErrorMessage, "Could not get cell on field");
        LogPool::getInstance()->printLog(&message);
    }
}

std::pair<int, int> Field::getPlayerPosition() const {
    return playerPosition;
}

std::pair<int, int> Field::getExitPosition() const {
    return finishPosition;
}

void Field::setEvent(std::pair<int, int> position, Event* event) {
    if (0 <= position.second and position.second < fieldSize.second and 0 <= position.first and position.first < fieldSize.first){
        if (dynamic_cast<EventPlayerAddCoin*>(event)){
            if (!(dynamic_cast<EventPlayerAddCoin*>(getEvent(position)))) totalCoins+=1;
        } else if (dynamic_cast<EventPlayerAddCoin*>(getEvent(position))) totalCoins-=1;
        field.at(position.second).at(position.first).setEvent(event);
        return;
    }
    throw std::invalid_argument ("Incorrect cell position");
}

std::vector<std::vector<Cell>>& Field::getMap() {
    return field;
}

void Field::setSize(int width, int height) {
    fieldSize.first = width;
    fieldSize.second = height;
}

void Field::setPlayer(Player *player){
    this->player =player;
}

bool Field::isPlayerSpawned() {
    if (playerPosition.first == -1 || playerPosition.second == -1) return false;
    return true;
}

void Field::setFinishPosition(std::pair<int, int> position) {
    if (0 <= position.second && position.second <= fieldSize.second && 0 <= position.first && position.first <= fieldSize.first){
        finishPosition = position;
    } else {
        throw std::invalid_argument("Incorrect finish position");
    }
}

int Field::getTotalCoins() const{
    return totalCoins;
}

Event* Field::getEvent(std::pair<int, int> position) {
    if (0 <= position.second && position.second <= fieldSize.second && 0 <= position.first && position.first <= fieldSize.first){
        return field.at(position.second).at(position.first).getEvent();
    } else {
        throw std::invalid_argument("Incorrect get event position");
    }
}

Memento Field::saveState() {
    Memento fieldMemento;
    std::string playerState = createSaveState();
    fieldMemento.saveState(playerState, SAVEFILE);
    return fieldMemento;
}

void Field::restoreState(Memento fieldMemento) {
    std::string playerStateHash = fieldMemento.restoreState(SAVEFILE);
    restoreData(playerStateHash);
}

std::string Field::createSaveState() {
    std::string fieldParameters = std::to_string(hash(fieldSize, playerPosition, finishPosition, totalCoins, field));
    fieldParameters += "\n" + std::to_string(fieldSize.first) + "\n" + std::to_string(fieldSize.second);
    fieldParameters += "\n" + std::to_string(playerPosition.first) + "\n" + std::to_string(playerPosition.second);
    fieldParameters += "\n" + std::to_string(finishPosition.first) + "\n" + std::to_string(finishPosition.second);
    fieldParameters += "\n" + std::to_string(totalCoins);
    for (int h = 0; h < fieldSize.second; ++h){
        for (int w = 0; w < fieldSize.first; ++w){
            fieldParameters+="\n" + cellToName.at(field.at(h).at(w).hash());
            if (field.at(h).at(w).getEvent() == nullptr) fieldParameters+="\nNone";
            else fieldParameters += "\n" + eventToName.at(field.at(h).at(w).getEvent()->hash());
        }
    }
    return fieldParameters;
}

void Field::restoreData(const std::string &str) {
    auto ss = std::stringstream{str};
    std::vector<int> data;
    std::string hashFromFile;
    bool isReadHash = true;
    int cntLine = 0;
    int cntTotalLine = 1;
    bool isCellType = true;
    int width = 0;
    int height = 0;
    auto* tmpField = new std::vector<std::vector<Cell>>();
    std::string tmpLine;
    try {
        for (std::string line; std::getline(ss, line, '\n');) {
            tmpLine = line;
            if (isReadHash) {
                hashFromFile = line;
                isReadHash = false;
            } else {
                if (cntLine < TOTALFIELDINTPARAMS)
                    data.push_back(std::stoi(line));
                else {
                    if (isCellType) {
                        if (width == 0) tmpField->emplace_back();
                        tmpField->at(height).emplace_back();
                        tmpField->at(height).at(width) = cellFactory.getCell(line);
                    } else {
                        if (line != "None") {
                            auto tmpEvent = eventToObject.at(line)();
                            tmpField->at(height).at(width).setEvent(tmpEvent);
                        }
                        ++width;
                    }
                    height += width / data[INDEXSIZE];
                    width %= data[INDEXSIZE];
                    isCellType = !isCellType;
                }
                ++cntLine;
            }
            ++cntTotalLine;
        }
    } catch (...) {
        throw OpenFileException("Field file data incorrect at line " + std::to_string(cntTotalLine) + " >> " + tmpLine);
    }
    size_t fieldHash = hash(std::pair<int, int>(data[INDEXSIZE], data[INDEXSIZE+1]),
                            std::pair<int, int>(data[INDEXPLAYERPOSITION], data[INDEXPLAYERPOSITION+1]),
                            std::pair<int, int>(data[INDEXFINISHPOSITION], data[INDEXFINISHPOSITION+1]),
                            data[INDEXTOTALCOINS],
                            *tmpField);

    if (std::to_string(fieldHash) != hashFromFile){
        throw RestoreStateException("Field file data has been changed. Hash of restored data " + std::to_string(fieldHash) + "not equal " + hashFromFile);
    } else {
        restoredData = std::make_tuple(
                std::pair<int, int>(data[INDEXSIZE], data[INDEXSIZE+1]),
                std::pair<int, int>(data[INDEXPLAYERPOSITION], data[INDEXPLAYERPOSITION+1]),
                std::pair<int, int>(data[INDEXFINISHPOSITION], data[INDEXFINISHPOSITION+1]),
                data[INDEXTOTALCOINS],
                tmpField
        );
    }
}



size_t Field::hash(std::pair<int, int> size, std::pair<int, int> playerPosition, std::pair<int, int> finishPosition, int coins, std::vector<std::vector<Cell>> field) {
    size_t hashSize = std::max(std::hash<int>()(size.first), size_t(1)) ^ (std::max(std::hash<int>()(size.second << 1), size_t(1)));
    size_t hashPlayerPosition = std::max(std::hash<int>()(playerPosition.first), size_t(1)) ^ (std::max(std::hash<int>()(playerPosition.second << 1), size_t(1)));
    size_t hashFinishPosition = std::max(std::hash<int>()(finishPosition.first), size_t(1)) ^ (std::max(std::hash<int>()(finishPosition.second << 1), size_t(1)));
    size_t hashCoins = std::max(std::hash<int>()(coins), size_t(1));

    auto hashField = size_t(0);
    for (int h = 0; h < size.second; ++h){
        for (int w = 0; w < size.first; ++w){
            hashField+= field.at(h).at(w).hash() << w;
            if (field.at(h).at(w).getEvent() != nullptr)
                hashField+= field.at(h).at(w).getEvent()->hash() << h;
        }
    }

    return hashField ^ ( (hashCoins << 1) ^ ( (hashFinishPosition << 2) ^ ( (hashPlayerPosition << 3) ^ (hashSize << 4))));
}

void Field::restoreCorrectState() {
    for (int h = 0; h < fieldSize.second; ++h){
        for (int w = 0; w < fieldSize.first; ++w){
            delete field.at(h).at(w).getEvent();
        }
    }
    field.clear();
    playerPosition = std::get<1>(restoredData);
    field = *std::get<4>(restoredData);
    fieldSize = std::get<0>(restoredData);
    finishPosition = std::get<2>(restoredData);
    totalCoins = std::get<3>(restoredData);
    changePlayerPosition(playerPosition);
}



