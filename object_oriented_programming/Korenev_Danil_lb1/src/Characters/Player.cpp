#include <algorithm>
#include "Player.h"
#define MAXVALUE 100u

Player::Player(unsigned int health,
               unsigned int shield,
               unsigned int xp):
                health(health),
                shield(shield),
                xp(xp){}

unsigned int Player::getHealth() const{
    return this->health;
};
unsigned int Player::getShield() const{
    return this->shield;
};
void Player::setHealth(unsigned int health){
    this->health = health;
    roundValue(this->health);
};

void Player::setShield(unsigned int shield) {
    this->shield = shield;
    roundValue(this->shield);
};

void Player::addHealth(unsigned int health){
    this->health+=health;
    roundValue(this->health);
};

void Player::addShield(unsigned int shield){
    this->shield+=shield;
    roundValue(this->shield);
};

void Player::addXp(unsigned int xp){
    this->xp+=xp;
    roundValue(this->xp);
};

void Player::downHealth(unsigned int health){
    if (this->health <= health){
        this->health = 0;
    } else {
        this->health -= health;
    }
}

void Player::downShield(unsigned int shield){
    if (this->shield < shield){
        this->downHealth(shield - this->shield);
        this->shield = 0;
    } else {
        this->shield -= shield;
    }
}



void Player::roundValue(unsigned int& value){
    value = std::min(value, MAXVALUE);
}
