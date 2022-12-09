#include "OpenFileException.h"

std::string  OpenFileException::what() {
    return "Error open file state because of:\n" + message;
}
