#include "RestoreStateException.h"

std::string  RestoreStateException::what() {
    return "Error restore state because of:\n" + message;
}
