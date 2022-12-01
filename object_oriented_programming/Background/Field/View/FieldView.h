#ifndef LAB2_FIELDVIEW_H
#define LAB2_FIELDVIEW_H


#include "../../Data/Observer.h"
#include "../../Data/Model.h"
#include "../Field/Field.h"
#include "CellView.h"

class FieldView: public Observer{
public:
    FieldView() = default;
    FieldView(Model *model);
    void update() final;
private:
    void printFieldView(Field*);
    CellView cellView;
    Model* model;
};


#endif