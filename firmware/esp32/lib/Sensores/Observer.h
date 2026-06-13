#ifndef OBSERVER_H
#define OBSERVER_H

class Observer {
    public:
        virtual ~Observer() = default;
        //Metodo para notificar cambios
        virtual void update() = 0;
};

#endif
