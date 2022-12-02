#ifndef LAB2_PLAYER_H
#define LAB2_PLAYER_H


#include <map>
#include <vector>
#include "../GameObject.h"
#include "../Save/Originator/Originator.h"

class Player: public GameObject, public Originator{
private:
    std::string createHash();
    void restoreHash(const std::string&);
    std::vector<std::string> parameters = {"health", "xp", "shield", "coins"};
    std::map<std::string, int> getValue{
            {"health", health},
            {"xp", xp},
            {"shield", shield},
            {"coins", coins}
    };
public:

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

    Memento saveState() override;
    void restoreState(Memento) override;

private:
    int health;
    int shield;
    int xp;
    int coins;
};


#endif

