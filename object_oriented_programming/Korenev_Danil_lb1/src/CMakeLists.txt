cmake_minimum_required(VERSION 3.23)
project(Game)

set(CMAKE_CXX_STANDARD 17)

add_executable(Game Runtime/main.cpp Background/FieldView.cpp Background/FieldView.h Background/Field.cpp Background/Field.h Background/Cell.cpp Background/Cell.h Background/CellView.cpp Background/CellView.cpp Background/CellView.h Characters/Player.cpp Characters/Player.h Runtime/CommandReader.cpp Runtime/CommandReader.h Runtime/MediatorObject.h Runtime/Mediator.cpp Runtime/Mediator.h Runtime/Controller.cpp Runtime/Controller.h Background/Event.h Background/TrapEventJoker.cpp Background/TrapEventJoker.h Background/TrapEventBanana.cpp Background/TrapEventBanana.h Background/CellGrass.cpp Background/CellGrass.h Background/CellWall.cpp Background/CellWall.h Background/CellPlayer.cpp Background/CellPlayer.h)
