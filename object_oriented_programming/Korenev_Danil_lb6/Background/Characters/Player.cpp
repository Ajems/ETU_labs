#include <sstream>
#include <algorithm>
#include "Player.h"
#include "../../Runtime/Log/Message/Message.h"
#include "../../Runtime/Log/LogPool/LogPool.h"

#define MAXVALUE 100

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
    if (this->health <= health){
        this->health = 0;
    } else {
        this->health -= health;
    }
    Message message = Message(Levels::GameMessage, "Health parameter reduced to " + std::to_string(this->health));
    LogPool::getInstance()->printLog(&message);
}
void Player::takeDamage(int shield){
    if (this->shield < shield){
        this->downHealth(shield - this->shield);
        this->shield = 0;
    } else {
        this->shield -= shield;
    }
    Message message = Message(Levels::GameMessage, "Shield parameter reduced to " + std::to_string(this->shield));
    LogPool::getInstance()->printLog(&message);
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
    playerMemento.saveState(playerState);
    return playerMemento;
}

void Player::restoreState(Memento playerMemento) {
    std::string playerStateHash = playerMemento.restoreState();
    restoreData(playerStateHash);
}

std::string Player::createSaveState() {
    //TODO std::playerParameters сделать хэш на игрока
    std::string playerParameters;
    for (const auto& parameter: parameters){
        playerParameters+=std::to_string(getValue.at(parameter));
        playerParameters+="\n";
    }
    //std::string playerHashParameters = std::hash;
    //playerParameters+=playerHashParameters;
    return playerParameters;
}

void Player::restoreData(const std::string& str) {
    auto ss = std::stringstream{str};
    std::string playerHash;
    std::string parameterName;
    int cnt = -1;
    for (std::string line; std::getline(ss, line, '\n');){
        if (cnt == -1) {
            playerHash = line;
        } else {
            getValue.at(parameters[0]) = std::stoi(line);
        }
        ++cnt;
    }
    //TODO сравнить хэш и игрока с полученными данными
}



