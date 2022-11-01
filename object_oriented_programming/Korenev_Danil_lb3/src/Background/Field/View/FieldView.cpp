#include <iostream>
#include "FieldView.h"


FieldView::FieldView(Model *model): model(model) {
    //std::cout << "FieldView created\n";
    model->setObserver(this);
}

void FieldView::printFieldView(Field* field){
    std::cout << " + ";
    for (int w = 0; w != field->getFieldSize().first; ++w) std::cout<<" - ";
    std::cout << " + \n";

    for(unsigned int h = 0; h != field->getFieldSize().second; ++h){
        std::cout << " | ";
        for(unsigned int w = 0; w != field->getFieldSize().first; ++w) std::cout << " " << cellView.getView(field->getCell(std::pair<int, int>({w, field->getFieldSize().second-h-1}))) << " ";
        std::cout << " | " << '\n';
    }

    std::cout << " + ";
    for (int w = 0; w != field->getFieldSize().first; ++w) std::cout<<" - ";
    std::cout << " + " << '\n';
}

void FieldView::update() {
    printFieldView(model->getField());
};
