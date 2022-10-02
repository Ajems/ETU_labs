#include "CellView.h"

CellView &CellView::operator=(const CellView &other) {
    view = other.view;
    return *this;
}

char CellView::getView(const Cell& cell) const {
    return view.at(cell.getId());
}
