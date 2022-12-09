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

#include "Event/EventPlayer/EventPlayerAddCoin.h"
#include "Event/EventPlayer/EventPlayerAddHealth.h"
#include "Event/EventPlayer/EventPlayerAddShield.h"
#include "Event/EventPlayer/EventPlayerOpenChest.h"
#include "Event/EventPlayer/EventPlayerTakeDamage.h"
#include "Event/EventField/EventFieldCrashWall.h"
#include "Event/EventField/EventFieldPlayerTeleport.h"
#include "Event/EventField/EventFieldSpawnCoins.h"


class Field: public GameObject, public Originator{
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
    std::map<size_t, std::string> cellToName = {
            {typeid(CellWall).hash_code(), "Wall"},
            {typeid(CellGrass).hash_code(), "Grass"},
            {typeid(CellPlayer).hash_code(), "Player"}
    };


    std::map<size_t, std::string> eventToName = {
            {typeid(EventPlayerAddCoin).hash_code(), "PlayerAddCoin"},
            {typeid(EventPlayerAddHealth).hash_code(), "PlayerAddHealth"},
            {typeid(EventPlayerAddShield).hash_code(), "PlayerAddShield"},
            {typeid(EventPlayerOpenChest).hash_code(), "PlayerOpenChest"},
            {typeid(EventPlayerTakeDamage).hash_code(), "PlayerTakeDamage"},
            {typeid(EventFieldCrashWall).hash_code(), "FieldCrashWall"},
            {typeid(EventFieldPlayerTeleport).hash_code(), "FieldPlayerTeleport"},
            {typeid(EventFieldSpawnCoins).hash_code(), "FieldSpawnCoins"}
    };

    std::map<std::string, std::function<Event*()>> eventToObject = {
            {"PlayerAddCoin", [](){return new EventPlayerAddCoin(typeid(EventPlayerAddCoin).hash_code());}},
            {"PlayerAddHealth", [](){return new EventPlayerAddHealth(typeid(EventPlayerAddHealth).hash_code());}},
            {"PlayerAddShield", [](){return new EventPlayerAddShield(typeid(EventPlayerAddShield).hash_code());}},
            {"PlayerOpenChest", [](){return new EventPlayerOpenChest(typeid(EventPlayerOpenChest).hash_code());}},
            {"PlayerTakeDamage", [](){return new EventPlayerTakeDamage(typeid(EventPlayerTakeDamage).hash_code());}},
            {"FieldCrashWall", [](){return new EventFieldCrashWall(typeid(EventFieldCrashWall).hash_code());}},
            {"FieldSpawnCoins", [](){return new EventFieldSpawnCoins(typeid(EventFieldSpawnCoins).hash_code());}}
    };

    std::string createSaveState();
    void restoreData(const std::string &str);
    size_t hash(std::pair<int, int>, std::pair<int, int>, std::pair<int, int>, int, std::vector<std::vector<Cell>>);
    std::tuple<std::pair<int, int>, std::pair<int, int>, std::pair<int, int>, int, std::vector<std::vector<Cell>>*> restoredData;
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

    Memento saveState() final;
    void restoreState(Memento) final;
    void restoreCorrectState() final;
};


#endif