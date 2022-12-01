#ifndef LAB2_FIELDGENERATOR_H
#define LAB2_FIELDGENERATOR_H

#include "Field.h"

template<typename ... Args>
class FieldGenerator {
public:
    Field* generate() {
        Field* field = new Field;
        (Args()((*field)), ...);
        return field;
    }
};



#endif
