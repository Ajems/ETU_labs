#include <sstream>
#include <algorithm>
#include <iostream>
#include "Player.h"
#include "../../Runtime/Log/Message/Message.h"
#include "../../Runtime/Log/LogPool/LogPool.h"

#define MAXVALUE 100
#define SAVEFILE "player_save.txt"

Player::Player(int health,
               int shield,
               int xp,
               int coins):
        health(health),
        shield(shield),
        xp(xp),
        coins(coins){
    Message message = Message(Levels::GameMessage, "Player created");
    LogPool::getInstance()->printLog(&message);
}

int Player::getHealth() const{
    return health;
};
int Player::getShield() const{
    return shield;
};
int Player::getXp() const{
    return xp;
}
int Player::getCoins() const {
    return coins;
}


void Player::addHealth(int health){
    this->health+=health;
    roundValue(this->health);
    Message message = Message(Levels::GameMessage, "Health parameter increased to " + std::to_string(this->health));
    LogPool::getInstance()->printLog(&message);
};
void Player::addShield(int shield){
    this->shield+=shield;
    roundValue(this->shield);
    Message message = Message(Levels::GameMessage, "Shield parameter increased to " + std::to_string(this->shield));
    LogPool::getInstance()->printLog(&message);
};


void Player::addXp(int xp) {
    this->xp+=xp;
    roundValue(this->xp);
    Message message = Message(Levels::GameMessage, "XP parameter increased to " + std::to_string(this->xp));
    LogPool::getInstance()->printLog(&message);
}

void Player::addCoins(int coins) {
    this->coins += coins;
    Message message = Message(Levels::GameMessage, "Coins parameter increased to " + std::to_string(this->coins));
    LogPool::getInstance()->printLog(&message);
}


void Player::downHealth(int health){
    std::cout << "Down health " << health << '\n';
    if (this->health <= health){
        this->health = 0;
    } else {
        this->health -= health;
    }
    Message message = Message(Levels::GameMessage, "Health parameter reduced to " + std::to_string(this->health));
    LogPool::getInstance()->printLog(&message);
}
void Player::takeDamage(int shield){
    std::cout << "Take damage " << shield << '\n';
    int tmpShield = this->shield;
    if (this->shield < shield){
        this->shield = 0;
    } else {
        this->shield -= shield;
    }
    Message message = Message(Levels::GameMessage, "Shield parameter reduced to " + std::to_string(this->shield));
    LogPool::getInstance()->printLog(&message);
    this->downHealth(shield - tmpShield);
}
void Player::downCoins(int coins){
    if (this->coins < coins){
        this->coins = 0;
    } else {
        this->coins -= coins;
    }
    Message message = Message(Levels::GameMessage, "Coins parameter reduced to " + std::to_string(this->coins));
    LogPool::getInstance()->printLog(&message);
}


void Player::roundValue(int& value){
    value = std::min(value, MAXVALUE);
}

Memento Player::saveState() {
    Memento playerMemento;
    std::string playerState = createSaveState();
    playerMemento.saveState(playerState, SAVEFILE);
    return playerMemento;
}

void Player::restoreState(Memento playerMemento) {
    std::string playerStateHash = playerMemento.restoreState(SAVEFILE);
    restoreData(playerStateHash);
}

std::string Player::createSaveState() {
    std::string playerParameters = std::to_string(hash(health, xp, shield, coins));
    for (const auto& parameter: parameters){
        playerParameters+="\n";
        playerParameters+=std::to_string(getValue.at(parameter)());
    }
    return playerParameters;
}

void Player::restoreData(const std::string& str) {
    auto ss = std::stringstream{str};
    std::vector<int> data;
    std::string hashFromFile;
    bool isReadHash = true;
    for (std::string line; std::getline(ss, line, '\n');){
        if (isReadHash){
            hashFromFile = line;
            isReadHash = false;
        } else data.push_back(std::stoi(line));
    }

    size_t playerHash = hash(data[0], data[1], data[2], data[3]);
    if (std::to_string(playerHash) != hashFromFile){
        std::cout << "Изменен файл игрока\n";
        std::cout << std::to_string(playerHash) << '\n';
    } else {
        health = data[0];
        shield = data[1];
        xp = data[2];
        coins = data[3];
    }
}


size_t Player::hash(int health, int shield, int xp, int coins) {
    size_t hashHealth = std::max(std::hash<int>()(health), size_t(1));
    size_t hashShield = std::max(std::hash<int>()(shield), size_t(1));
    size_t hashXp = std::max(std::hash<int>()(xp), size_t(1));
    size_t hashCoins = std::max(std::hash<int>()(coins), size_t(1));
    return hashHealth ^ ( (hashShield << 1) ^ ( (hashXp << 2) ^ (hashCoins << 3)));
}



