#ifndef LAB2_CELLVIEW_H
#define LAB2_CELLVIEW_H


#include <map>
#include "../Field/Cell/Cell.h"

class CellView{
public:
    CellView &operator=(const CellView&);
    char getView(Cell&) const;
};


#endif