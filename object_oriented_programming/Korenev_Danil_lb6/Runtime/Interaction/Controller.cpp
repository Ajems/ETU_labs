#include <iostream>
#include <fstream>
#include "Controller.h"
#include "../Exceptions/SaveExceptions/SaveStateException.h"
#include "../Log/Message/Message.h"
#include "../Log/LogPool/LogPool.h"
#include "../Exceptions/SaveExceptions/RestoreStateException.h"
#include "../Exceptions/SaveExceptions/OpenFileException.h"

Controller::Controller(std::string level): fieldView(FieldView(&model)), model(Model()){
    model.createField(level);
    model.notify();
}

void Controller::notify(Control& command) {
    if (interaction.find(command) == interaction.end()){
        model.movePlayerPosition(command);
    } else {
        try {
            interaction.at(command)();
        } catch (SaveStateException& se){
            Message message = Message(Levels::ErrorMessage, "could not save game");
            LogPool::getInstance()->printLog(&message);
        } catch (RestoreStateException& rse){
            Message message = Message(Levels::ErrorMessage, "could not restore game, because of:\n" + std::string(rse.what()));
            LogPool::getInstance()->printLog(&message);
        } catch (OpenFileException& ofe) {
            Message message = Message(Levels::ErrorMessage, "could not restore game, because of:\n" + std::string(ofe.what()));
            LogPool::getInstance()->printLog(&message);
        } catch (...) {
            Message message = Message(Levels::ErrorMessage, "unknown error when save/restore/exit");
            LogPool::getInstance()->printLog(&message);
        }
    }
}

bool Controller::isEndGame(){
    return model.isEndGame();
}
