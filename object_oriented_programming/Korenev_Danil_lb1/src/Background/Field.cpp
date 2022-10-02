#include <valarray>
#include "Field.h"
#include "TrapEventJoker.h"
#include "TrapEventBanana.h"
#include "CellWall.h"
#include "CellGrass.h"
#include "CellPlayer.h"


Field::Field(std::pair<unsigned int, unsigned int> fieldSize, std::pair<int, int> playerPosition):
        fieldSize(fieldSize),
        playerPosition(playerPosition){

    setField();
};


Field::Field(const Field& fieldObj):
    fieldSize(fieldObj.fieldSize),
    playerPosition(fieldObj.playerPosition){
    for (int h = 0; h != fieldSize.second; ++h){
        field.emplace_back();
        for (int w = 0; w != fieldSize.first; ++w){
            field.at(h).push_back(fieldObj.field.at(h).at(w));
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
    for(int h = 0; h < fieldSize.second; ++h){
        field.emplace_back();
        for(int w = 0; w < fieldSize.first; ++w){
            if (10 <= h + w and h + w <= 11){
                auto* cellWall = new CellWall();
                field.at(h).push_back(cellWall);
            }else {
                auto* cellGrass = new CellGrass();
                field.at(h).push_back(cellGrass);
            }
            if (h+w == 3){
                auto* trapEvent = new TrapEventJoker();
                field.at(h).at(w)->setEvent(trapEvent);
            }
            if (h == fieldSize.second - 3){
                auto* trapEvent = new TrapEventBanana();
                field.at(h).at(w)->setEvent(trapEvent);
            }
            auto* cellPlayer = new CellPlayer();
            if (h == playerPosition.second and w == playerPosition.first) field.at(h).at(w) = cellPlayer;
        }
    }
};

std::pair<unsigned int, unsigned int> Field::getFieldSize() const{
    return fieldSize;
};

const Cell& Field::getCell(unsigned int height, unsigned int width) const{
    return field.at(height).at(width)->getCell();
}

void Field::movePlayer(Player::STEP step) {

    auto newPosition = playerPosition;
    switch (step) {
        case Player::UP:
            ++newPosition.second;
            break;
        case Player::DOWN:
            --newPosition.second;
            break;
        case Player::LEFT:
            --newPosition.first;
            break;
        case Player::RIGHT:
            ++newPosition.first;
            break;
        default:
            break;
    }

    newPosition.first%=int(fieldSize.first);
    if(newPosition.first < 0) newPosition.first += int(fieldSize.first);

    newPosition.second%=int(fieldSize.second);
    if(newPosition.second < 0) newPosition.second += int(fieldSize.second);


    if (field.at(newPosition.second).at(newPosition.first)->isPassable()){
        auto* cellGrass = new CellGrass();

        field.at(newPosition.second).at(newPosition.first)->callEvent();
        field.at(newPosition.second).at(newPosition.first)->Cell::~Cell();
        field.at(newPosition.second).at(newPosition.first) = field.at(playerPosition.second).at(playerPosition.first);

        field.at(playerPosition.second).at(playerPosition.first)->Cell::~Cell();
        field.at(playerPosition.second).at(playerPosition.first) = cellGrass;

        playerPosition = newPosition;
    }
}


