#include <iostream>
#include "Field.h"
#include "CellView.h"
#include "FieldView.h"


void FieldView::printFieldView(const Field* field) const{
    std::cout << " + ";
    for (int w = 0; w != field->getFieldSize().first; ++w) std::cout<<" - ";
    std::cout << " + \n";

    for(unsigned int h = 0; h != field->getFieldSize().second; ++h){
        std::cout << " | ";
        for(unsigned int w = 0; w != field->getFieldSize().first; ++w) std::cout << " " << cellView.getView(field->getCell(field->getFieldSize().second-h-1, w)) << " ";
        std::cout << " | " << '\n';
    }

    std::cout << " + ";
    for (int w = 0; w != field->getFieldSize().first; ++w) std::cout<<" - ";
    std::cout << " + " << '\n';
};
