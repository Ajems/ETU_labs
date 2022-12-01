#ifndef LAB2_SAVEABLE_H
#define LAB2_SAVEABLE_H


class Saveable {
public:
    virtual void save() = 0;
    virtual void load() = 0;
};


#endif
