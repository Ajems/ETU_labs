#ifndef LAB2_MEMENTO_H
#define LAB2_MEMENTO_H

template<typename Origin>
class Memento {
private:
    Origin state;
public:
    void setState(Origin);
    Origin getState();
};

template<typename Origin>
void Memento<Origin>::setState(Origin state) {
    this->state = state;
}

template<typename Origin>
Origin Memento<Origin>::getState() {
    return state;
}


#endif