#include "EventPlayer.h"


void EventPlayer::callReaction(GameObject *obj) {
    if (auto player = dynamic_cast<Player*>(obj)){
        changePlayer(player);
    }
}