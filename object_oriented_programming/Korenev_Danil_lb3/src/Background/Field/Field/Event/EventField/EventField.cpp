#include "EventField.h"
#include "../../Field.h"

void EventField::callReaction(GameObject* obj) {
    if (auto field = dynamic_cast<Field*>(obj)){
        changeField(field);
    }
}
