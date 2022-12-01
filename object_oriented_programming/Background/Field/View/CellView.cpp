#include "CellView.h"
#include "../Field/Event/EventPlayer/EventPlayerAddCoin.h"
#include "../Field/Event/EventPlayer/EventPlayerAddHealth.h"
#include "../Field/Event/EventPlayer/EventPlayerAddShield.h"
#include "../Field/Event/EventPlayer/EventPlayerOpenChest.h"
#include "../Field/Event/EventPlayer/EventPlayerTakeDamage.h"
#include "../Field/Event/EventField/EventFieldCrashWall.h"
#include "../Field/Event/EventField/EventFieldPlayerTeleport.h"
#include "../Field/Event/EventField/EventFieldSpawnCoins.h"

CellView &CellView::operator=(const CellView &other) {
    return *this;
}

char CellView::getView(Cell& cell) const {
    if (cell.isStepped()) {
        return '*';
    } else if (!cell.isPassable()){
        return '#';
    } else if (cell.getEvent() != nullptr){
        std::string type;
        if (dynamic_cast<EventPlayerAddCoin*>(cell.getEvent())) return '$';
        else if (dynamic_cast<EventPlayerAddHealth*>(cell.getEvent())) return '+';
        else if (dynamic_cast<EventPlayerAddShield*>(cell.getEvent())) return 'V';
        else if (dynamic_cast<EventPlayerOpenChest*>(cell.getEvent())) return 'H';
        else if (dynamic_cast<EventPlayerTakeDamage*>(cell.getEvent())) return '@';
        else if (dynamic_cast<EventFieldCrashWall*>(cell.getEvent())) return '!';
        else if (dynamic_cast<EventFieldPlayerTeleport*>(cell.getEvent())) return 'O';
        else if (dynamic_cast<EventFieldSpawnCoins*>(cell.getEvent())) return 'S';
        else return '?';
    } else{
        return ' ';
    }
}

