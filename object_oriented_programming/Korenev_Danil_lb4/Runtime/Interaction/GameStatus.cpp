#include <iostream>
#include "GameStatus.h"
#include "../Log/Message/Message.h"
#include "../Log/Levels.h"
#include "../Log/LogPool/LogPool.h"

bool GameStatus::isEndGame(Field* field, Player* player) const {
    bool win = isWin(field, player);
    if (win){
        std::cout << "You Win!\n";
        Message message = Message(Levels::StatusMessage, "Player won");
        LogPool::getInstance()->printLog(&message);
    }
    bool loose = isLoose(field, player);
    if (loose){
        std::cout << "You Lose!\n";
        Message message = Message(Levels::StatusMessage, "Player lose");
        LogPool::getInstance()->printLog(&message);
    }
    return (win || loose);
}

bool GameStatus::isWin(Field* field, Player* player) const{
    bool win = ((player->getCoins() >= ((field->getFieldSize().first/2)*10)) and (field->getPlayerPosition().first==field->getExitPosition().first and field->getPlayerPosition().second==field->getExitPosition().second));
    return win;
}

bool GameStatus::isLoose(Field* field, Player* player) const{
    bool loose = (player->getHealth() <= 0);
    return loose;
}
