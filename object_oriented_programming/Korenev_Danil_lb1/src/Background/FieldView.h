#ifndef GAME_FIELDVIEW_H
#define GAME_FIELDVIEW_H

#include "Field.h"
#include "CellView.h"

class FieldView {
public:
    void printFieldView(const Field*) const;
private:
    CellView cellView;
};


#endif
