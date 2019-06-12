class Aircraft {
    constructor()
    {
        this.data = {};
        this.weightStart = 0;
        this.weightEnd = 0;
        this.weightInc = 100;
        this.cgStart = 0;
        this.cgEnd = 0;
        this.cgInc = 1;
    }

    _getCGStart()
    {
        return (Math.floor(this.data.fwd)-1);
    }

    _getCGEnd()
    {
        return (Math.floor(this.data.aft)+1);
    }

    _getWeightStart()
    {
        return (Math.floor(this.data.bew/100) * 100) - 100;

    }

    _getWeightEnd()
    {
        return (Math.floor(this.data.mrw/100) * 100) + 100;

    }

    getAircraftByCallSign(callsign)
    {
        console.log("return aircraft by callsign");
        this.data = {
            callsign: 'PH-DRT',
            type: 'P28A',
            bew: 1617.0,
            beArm: 88.87,
            beMoment: 143701.3,
            frontArm: 80.50,
            rearArm: 118.10,
            bagageArm: 142.80,
            feulArm: 95.00,
            maxFuel: 48.0,
            mrw: 2558.0,
            mtow: 2550.0,
            fwd: 82.0,
            aft: 93.0,
            fwdW: 2050.0,
            mtowFwd: 88.6,
            maxUtilW: 2130.0,
        };

        this.weightStart = this._getWeightStart();
        this.weightEnd = this._getWeightEnd();
        this.cgStart = this._getCGStart();
        this.cgEnd = this._getCGEnd();

        return this.data;
    }

    getAircraftByData(aircraftData)
    {
        console.log("return aircraft by data");
        this.data = aircraftData;

        this.weightStart = this._getWeightStart();
        this.weightEnd = this._getWeightEnd();
        this.cgStart = this._getCGStart();
        this.cgEnd = this._getCGEnd();

        return this.data;
    }
}

export default Aircraft;