#include "SecondLevel.h"
#include "../../GenerationRule/GenerationFieldSize.h"
#include "../../GenerationRule/GenerationPlayerSpawn.h"
#include "../../GenerationRule/GenerationFinishSpawn.h"
#include "../../GenerationRule/GenerationCell.h"
#include "../../Event/EventPlayer/EventPlayerAddCoin.h"
#include "../../GenerationRule/GenerationEventLine.h"
#include "../../Event/EventPlayer/EventPlayerTakeDamage.h"
#include "../../FieldGenerator.h"
#include "../../Event/EventPlayer/EventPlayerAddShield.h"
#include "../../Event/EventPlayer/EventPlayerAddHealth.h"
#include "../../Event/EventField/EventFieldCrashWall.h"

Field *SecondLevel::generate() {
    FieldGenerator<
            GenerationFieldSize<20, 17>,
            GenerationPlayerSpawn<4, 9>,
            GenerationFinishSpawn<19, 0>,

            GenerationCell<CellWall, 0, 19, 0, 1>,
            GenerationCell<CellWall, 3, 4, 10, 8>,
            GenerationCell<CellWall, 5, 6, 10, 8>,
            GenerationCell<CellWall, 1, 2, 2, 2>,
            GenerationCell<CellWall, 1, 4, 3, 1>,
            GenerationCell<CellWall, 5, 8, 3, 1>,
            GenerationCell<CellWall, 8, 9, 7, 5>,
            GenerationCell<CellWall, 7, 9, 7, 1>,
            GenerationCell<CellWall, 7, 8, 9, 3>,
            GenerationCell<CellWall, 7, 10, 9, 1>,
            GenerationCell<CellWall, 10, 11, 9, 3>,
            GenerationCell<CellWall, 10, 20, 6, 1>,
            GenerationCell<CellWall, 18, 19, 3, 3>,
            GenerationCell<CellWall, 3, 5, 10, 1>,
            GenerationCell<CellWall, 18, 20, 3, 1>,
            GenerationCell<CellWall, 17, 18, 13, 8>,
            GenerationCell<CellWall, 0, 3, 8, 1>,
            GenerationCell<CellWall, 17, 20, 13, 1>,
            GenerationCell<CellWall, 7, 17, 11, 1>,
            GenerationCell<CellWall, 0, 8, 15, 1>,
            GenerationCell<CellWall, 14, 15, 10, 3>,
            GenerationCell<CellWall, 7, 8, 14, 3>,

            GenerationEventLine<EventPlayerAddCoin, 2, 3, 2, 2>,
            GenerationEventLine<EventPlayerAddCoin, 6, 8, 5, 2>,
            GenerationEventLine<EventPlayerAddCoin, 8, 10, 16, 4>,
            GenerationEventLine<EventPlayerAddCoin, 15, 17, 9, 1>,

            GenerationEventLine<EventPlayerTakeDamage, 18, 19, 12, 7>,
            GenerationEventLine<EventPlayerTakeDamage, 6, 7, 8, 2>,
            GenerationEventLine<EventPlayerTakeDamage, 8, 10, 10, 1>,

            GenerationEventLine<EventPlayerAddShield, 8, 10, 8, 1>,
            GenerationEventLine<EventPlayerAddShield, 9, 10, 7, 2>,
            GenerationEventLine<EventPlayerAddHealth, 15, 17, 10, 1>,

            GenerationEventLine<EventFieldCrashWall, 4, 5, 11, 1>,
            GenerationEventLine<EventFieldCrashWall, 4, 5, 16, 1>
    > generator;
    return generator.generate();
}
