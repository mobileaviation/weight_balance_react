import * as Convert from './conversions';

export var WBType = {
    person: 1,
    fuel: 2,
    bagage: 3,
    airplane: 4,
    properties: {
        1: {name: "Person", value: 1},
        2: {name: "Fuel", value: 2},
        3: {name: "Bagage", value: 3}, 
        4: {name: "Airplane", value: 4}
    }
}

export var WBUnit = {
    lbs: 1,
    kg: 2,
    usg: 3,
    ltr: 4,
    properties: {
        1: {name: "lbs", value:1, display: "lbs"},
        2: {name: "Kg", value:2, display: "Kilo"},
        3: {name: "USG", value:3, display: "US Gallons"},
        4: {name: "ltr", value:4, display: "Liters"},
    }
}

export function wbOutItem(station, lbs, inch) {
    this.station = station;
    this.lbs = lbs;
    this.inch = inch;
    this.lbs_in = lbs * inch;
    }

export class wbInItem {
    constructor(name, value, type, unit) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.unit = unit;
    }
    get lbs() {
        if (this.unit===WBUnit.lbs) return this.value;
        if (this.unit===WBUnit.kg) return Convert.KgToLbs(this.value);
        if (this.unit===WBUnit.usg) return Convert.GalToLbsAvGas(this.value);
        if (this.unit===WBUnit.ltr) return Convert.LtrToLbsAvGas(this.value);
    }

    set lbs(value) {
        if (this.unit===WBUnit.lbs) this.value = value;
        if (this.unit===WBUnit.kg) this.value = Convert.LbsToKg(value);
    }

    get liter() {
        if (this.unit===WBUnit.ltr) return this.value;
        if (this.unit===WBUnit.usg) return Convert.GalToLiter(this.value);
    }

    set liter(value) {
        if (this.unit===WBUnit.ltr) this.value = value;
        if (this.unit===WBUnit.usg) this.value = Convert.LiterToGal(value);
    }

    get kilo() {
        if (this.unit===WBUnit.kg) return this.value;
        if (this.unit===WBUnit.lbs) return Convert.LbsToKg(this.value);
    }

    set kilo(value) {
        if (this.unit===WBUnit.lbs) this.value = Convert.KgToLbs(value)
        if (this.unit===WBUnit.kg) this.value = value;
    }

    get usg() {
        if (this.unit===WBUnit.usg) return this.value;
        if (this.unit===WBUnit.ltr) return Convert.GalToLiter(this.value);
    }

    set usg(value) {
        if (this.unit===WBUnit.ltr) this.value = Convert.LiterToGal(value)
        if (this.unit===WBUnit.usg) this.value = value;
    }
}

export function getWBTestInObjects()
{
    var wbobjects = [];
    var storedWbObjects = JSON.parse(localStorage.getItem("WBObject"));

    if (storedWbObjects !== null) {
        storedWbObjects.forEach(element => {
            wbobjects.push(new wbInItem(element.name, element.value, element.type, element.unit));
        });
    }

    if (storedWbObjects === null) {

        wbobjects.push(new wbInItem("Pilot", 74, WBType.person, WBUnit.kg));
        wbobjects.push(new wbInItem("CoPilot", 103, WBType.person, WBUnit.kg));
        wbobjects.push(new wbInItem("Passenger 1", 0, WBType.person, WBUnit.kg));
        wbobjects.push(new wbInItem("Passenger 2", 0, WBType.person, WBUnit.kg));
        wbobjects.push(new wbInItem("Baggage", 15, WBType.bagage, WBUnit.kg));
        wbobjects.push(new wbInItem("Baggage2", 0, WBType.bagage, WBUnit.kg));
        wbobjects.push(new wbInItem("Total fuel", 40, WBType.fuel, WBUnit.usg));
        wbobjects.push(new wbInItem("Max fuel", 48, WBType.fuel, WBUnit.usg));
        wbobjects.push(new wbInItem("Taxi fuel", 1, WBType.fuel, WBUnit.usg));
        wbobjects.push(new wbInItem("Flight fuel", 10, WBType.fuel, WBUnit.usg));

        localStorage.setItem("WBObject", JSON.stringify(wbobjects));
    }

    return wbobjects;
}

export class Test {
    constructor()
    {
        this.name = "test";
    }

    test() {
        var p = new wbOutItem("BEW", 1617, 88.87);
        console.log(p);
        var i = new wbInItem("Pilot", 74, WBType.person, WBUnit.kg);
        console.log(i);
        var ii = new wbInItem("Total Fuel", 40, WBType.fuel, WBUnit.usg);
        console.log(ii);
    }
}

export default WBType;