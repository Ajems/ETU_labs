#include "FirstLevel.h"
#include "../../GenerationRule/GenerationFieldSize.h"
#include "../../GenerationRule/GenerationPlayerSpawn.h"
#include "../../GenerationRule/GenerationCell.h"
#include "../../GenerationRule/GenerationEventLine.h"
#include "../../FieldGenerator.h"

Field *FirstLevel::generate() {
    FieldGenerator<
        GenerationFieldSize<10, 15>, // повторное поле не будет создано
        GenerationPlayerSpawn<2, 2>,
        GenerationEventLine<EventPlayerAddCoin, 4, 8, 20, 17>, // параметры больше размеров поля обрабатываются
        GenerationCell<CellWall, 0, 15, 12, 2>,
        GenerationCell<CellWall, 8, 9, 12, 13>,
        GenerationCell<CellWall, 0, 1, 0, 1>, // нельзя поставить стенку на игрока
        GenerationEventLine<EventFieldCrashWall, 7, 8, 12, 20>,  // параметры больше размеров поля обрабатываются
        GenerationEventLine<EventPlayerTakeDamage, 1, 5, 6, 1>,
        GenerationEventLine<EventPlayerTakeDamage, 5, 6, 6, 6>
        > generator;
    return generator.generate();
}
