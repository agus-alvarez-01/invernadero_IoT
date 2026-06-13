#ifndef DATADISPATCHER_H
#define DATADISPATCHER_H

#include "../Sensores/Observer.h"
#include "../Sensores/SensorManager.h"
#include "ApiConnection.h"

class DataDispatcher : public Observer{
    private:
        SensorManager* manager;
        ApiConnection* apiConnection;

    public:
        DataDispatcher(SensorManager* manager, ApiConnection* apiConnection);

        //TRIGGER
        void update() override;
};

#endif