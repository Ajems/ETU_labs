#include <iostream>
#include "Model.h"
#include "../../Runtime/Interaction/GameStatus.h"
#include "../../Runtime/Exceptions/SaveExceptions/SaveStateException.h"
#include "../../Runtime/Log/Message/Message.h"
#include "../../Runtime/Log/LogPool/LogPool.h"
#include "../../Runtime/Exceptions/SaveExceptions/OpenFileException.h"
#include "../../Runtime/Exceptions/SaveExceptions/RestoreStateException.h"

Model::Model() : player(Player()), context(nullptr) {};

Field *Model::getField() {
    return field;
}

void Model::movePlayerPosition(Control command) {
    field->movePlayer(command);
    callEvent(field->getPlayerPosition());
    this->notify();
}

bool Model::isEndGame() {
    return endGame | GameStatus().isEndGame(field, &player);
}

void Model::callEvent(std::pair<int, int> position) {
    field->callEvent(&player, position);
}

void Model::setEndGame() {
    endGame = true;
}

void Model::createField(const std::string& lvl) {
    context.setStrategy(levels.at(lvl));
    context.setLevel();
    field = context.getField();
    field->setPlayer(&player);
}

Model::~Model() {
    delete context.getField();
}

void Model::saveGame() {
    try {
        player.saveState();
        field->saveState();
        Message message = Message(Levels::StatusMessage, "Game saved");
        LogPool::getInstance()->printLog(&message);
    } catch (SaveStateException& se) {
        throw SaveStateException(se.what());
    } catch (...) {
        Message message = Message(Levels::ErrorMessage, "Unknown error save state");
        LogPool::getInstance()->printLog(&message);
    }
    notify();
}

void Model::restoreGame() {
    Memento mementoSavedState;
    try {
        player.restoreState(mementoSavedState);
        field->restoreState(mementoSavedState);
        //все данные файлов корректны -> можно восстановить состояние игры
        player.restoreCorrectState();
        field->restoreCorrectState();
        Message message = Message(Levels::StatusMessage, "game loaded");
        LogPool::getInstance()->printLog(&message);
    } catch (OpenFileException& ofe){
        throw OpenFileException(ofe.what());
    } catch (RestoreStateException& rse){
        throw RestoreStateException(rse.what());
    } catch (...) {
        Message message = Message(Levels::ErrorMessage, "unknown error restore gamer");
        LogPool::getInstance()->printLog(&message);
    }
    notify();
}
