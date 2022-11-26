#include "FirstLevel.h"
#include "../../GenerationRule/GenerationFieldSize.h"
#include "../../GenerationRule/GenerationPlayerSpawn.h"
#include "../../Event/EventPlayer/EventPlayerAddCoin.h"
#include "../../GenerationRule/GenerationCell.h"
#include "../../GenerationRule/GenerationEventLine.h"
#include "../../Event/EventField/EventFieldCrashWall.h"
#include "../../Event/EventPlayer/EventPlayerTakeDamage.h"
#include "../../Event/EventField/EventFieldPlayerTeleport.h"
#include "../../GenerationRule/GenerationEventExtendedLine.h"
#include "../../FieldGenerator.h"

Field *FirstLevel::generate() {
    FieldGenerator<
        GenerationFieldSize<-4, 10>, // некорректное значение, будет использовано дефолтное значение 10
        GenerationFieldSize<10, 15>, // повторное поле не будет создано
        GenerationPlayerSpawn<-4, 4>, // игрок не заспанится на некорректном месте
        GenerationPlayerSpawn<2, 2>,
        GenerationEventLine<EventPlayerAddCoin, 4, 8, 20, 17>, // параметры больше размеров поля обрабатываются
        GenerationCell<CellWall, 0, 15, 12, 2>,
        GenerationCell<CellWall, 8, 9, 12, 13>,
        GenerationCell<CellWall, 0, 1, 0, 1>, // нельзя поставить стенку на игрока
        GenerationEventLine<EventFieldCrashWall, 7, 8, 12, 20>,  // параметры больше размеров поля обрабатываются
        GenerationEventLine<EventPlayerTakeDamage, 1, 5, 6, 1>,
        GenerationEventLine<EventPlayerTakeDamage, 5, 6, 6, 6>,
        GenerationPlayerSpawn<4, 4>, // новый игрок не заспавнится
        GenerationEventExtendedLine<EventFieldPlayerTeleport, 2, 3, 5, 1, 3, 4>
    > generator;
    return generator.generate();
}
