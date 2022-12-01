#ifndef LAB2_FIELD_H
#define LAB2_FIELD_H


#include <utility>
#include <vector>
#include <memory>
#include <functional>
#include "Cell/Cell.h"

#include "Cell/CellFactory.h"
#include "../../Characters/Player.h"
#include "../../GameObject.h"
#include "../../../Runtime/Config/Control.h"


class Field: public GameObject{
private:
    std::pair<int, int> fieldSize = {-1, -1};
    std::pair<int, int> playerPosition = {-1, -1};
    std::pair<int, int> finishPosition = {-1, -1};
    std::pair<int, int> newPosition;
    int totalCoins = 0;
    CellFactory cellFactory;
    Player* player = nullptr;
    std::map<Control, std::function<void()>> reaction = {
            {Control::UP, [this](){++newPosition.second;}},
            {Control::DOWN, [this](){--newPosition.second;}},
            {Control::RIGHT, [this](){++newPosition.first;}},
            {Control::LEFT, [this](){--newPosition.first;}},
            {Control::NOTHING, [](){}}
    };
public:
    std::vector<std::vector<Cell>> field;

    Field() = default;
    ~Field() override = default;


    Field(const Field&);
    void swap(Field&);
    Field& operator=(const Field&);
    Field(Field&&);
    Field& operator=(Field&&);

    std::pair<int, int> getFieldSize() const;

    void changeCell(std::pair<int, int> position, std::string type);
    void changeCell(std::pair<int, int> position, Cell* cell);
    void setCell(std::pair<int, int> position, std::string type);
    Cell& getCell(std::pair<int, int>);

    void setPlayer(Player*);
    void movePlayer(Control);
    void changePlayerPosition(std::pair<int, int> newPosition);
    void setPlayerPosition(std::pair<int, int> newPosition);
    std::pair<int, int> getPlayerPosition() const;

    std::pair<int, int> getExitPosition() const;

    void setEvent(std::pair<int, int>, Event*);
    void callEvent(Player*, std::pair<int, int>);
    Event* getEvent(std::pair<int, int>);
    int getTotalCoins() const;

    std::vector<std::vector<Cell>>& getMap();
    void setSize(int width, int height);
    void setFinishPosition(std::pair<int, int>);

    bool isPlayerSpawned();
};


#endif
