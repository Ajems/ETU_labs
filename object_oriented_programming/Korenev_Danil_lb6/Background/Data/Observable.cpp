#include "Observable.h"

Observable::Observable():observer(nullptr){};

void Observable::setObserver(Observer* observer){
    this->observer = observer;
};

void Observable::notify(){
    observer->update();
};