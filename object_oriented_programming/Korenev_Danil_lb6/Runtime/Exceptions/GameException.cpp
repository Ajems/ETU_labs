#include "GameException.h"

#include <utility>

GameException::GameException(std::string errorMessage) {
    message = std::move(errorMessage);
}
