#include "SaveStateException.h"

std::string SaveStateException::what() {
    return "Error save game because of\n" + message;
}
