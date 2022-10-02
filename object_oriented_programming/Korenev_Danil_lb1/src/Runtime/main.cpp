#include "Mediator.h"

int main() {
    Controller controller;
    CommandReader commandReader;

    Mediator mediator(controller, commandReader);
    mediator.start();

    return 0;
};