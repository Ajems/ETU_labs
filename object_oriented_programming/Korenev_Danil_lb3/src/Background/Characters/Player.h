#ifndef LAB2_PLAYER_H
#define LAB2_PLAYER_H


#include "../GameObject.h"

class Player: public GameObject{
public:
    enum STEP{
        UP,
        DOWN,
        LEFT,
        RIGHT,
        NOTHING
    };

    Player(int health = 100,
           int shield = 0,
           int xp = 0,
           int coins = 0);

    int getHealth() const;
    int getShield() const;
    int getXp() const;
    int getCoins() const;


    void addHealth(int);
    void addShield(int);
    void addXp(int);
    void addCoins(int);

    void downHealth(int);
    void takeDamage(int);
    void downCoins(int);

    void roundValue(int&);

private:
    int health;
    int shield;
    int xp;
    int coins;
};


#endif

