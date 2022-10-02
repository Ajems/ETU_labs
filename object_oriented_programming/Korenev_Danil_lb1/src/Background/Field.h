#ifndef GAME_FIELD_H
#define GAME_FIELD_H
#include "vector"
#include "Cell.h"
#include "iostream"
#include "../Characters/Player.h"

#define MINHEIGHT 10
#define MINWIDTH 10


class Field{
private:
    std::pair<unsigned int, unsigned int> fieldSize;
    std::pair<int, int> playerPosition;
    std::vector<std::vector<Cell*>> field;
public:
    Field(std::pair<unsigned int, unsigned int> fieldSize = {MINWIDTH, MINHEIGHT},
          std::pair<int, int> playerPosition = {0, 0});

    Field(const Field&);
    void swap(Field&);
    Field& operator=(const Field&);
    Field(Field&&);
    Field& operator=(Field&&);

    void setField();
    void movePlayer(Player::STEP);

    std::pair<unsigned int, unsigned int> getFieldSize() const;
    const Cell& getCell(unsigned int, unsigned int) const;
};


#endif