var arrayOfStops = [];
var arrayOfVehicles = [];
var arrayOfServices = [];
var arrayOfLines = [];
var arrayOfRoutes = [];
var arrayOfStops2 = [];
var vehicleList = [];
var currentStopDisp = -1;
var currentRefreshCounter = 10;
var refCounterEl = document.querySelector("#refCount");
let markers = [];
let markersPKS = [];
var arrayOfVehiclesPKS = [];
var calendarArray = [];
var arrayVehHistory = [];
var routeOccurences = [];
var lineOccurences = { 1: [], 2: [], 3: [], 4: [] };
var totalTrips = 0;
var selectedLine = "";
var mapOpen = false;
var currMarker = null;
var currShape = null;
var currSelVeh = null;
var arrayOfServicesPKS = [];

let totalServ = 349; //UPDATE EVERY TT CHANGE!
const selectSort = document.querySelector("#sort-sel");
const staticTblBody = document.querySelector("#static-stable-body");
const dayTypeRadio = document.querySelectorAll("input[name='d-type']");
var urlBase = "4/";
var urlBasePKS = "PKS/";

const queryStrM = window.location.search;
const urlParamsM = new URLSearchParams(queryStrM);
let ttid = urlParamsM.get('ttid');
const ttidPKS = urlParamsM.get('ttidPKS');

const dateCond = new Date() >= new Date('2025-05-01 02:00:00');

if (dateCond) totalServ = 543;

let isCurrentTT = false;
let isCurrentTTPKS = false;

if (ttid == "22-07-01") {
  urlBase += "22-07-01/";
} else if (ttid == "23-10-01") {
  urlBase += "23-10-01/";
} else if (ttid == "23-10-30") {
  urlBase += "23-10-30/";
} else if (ttid == "23-11-02") {
  urlBase += "23-11-02/";
} else if (ttid == "23-11-18") {
  urlBase += "23-11-18/";
} else if (ttid == "24-01-01") {
  urlBase += "24-01-01/";
} else if (ttid == "24-02-01") {
  urlBase += "24-02-01/";
} else if (ttid == "24-03-01") {
  urlBase += "24-03-01/";
} else if (ttid == "24-03-11") {
  urlBase += "24-03-11/";
} else if (ttid == "24-03-18") {
  urlBase += "24-03-18/";
} else if (ttid == "24-04-01") {
  urlBase += "24-04-01/";
} else if (ttid == "24-05-01") {
  urlBase += "24-05-01/";
} else if (ttid == "24-06-24") {
  urlBase += "24-06-24/";
} else if (ttid == "24-07-01") {
  urlBase += "24-07-01/";
} else if (ttid == "24-07-21") {
  urlBase += "24-07-21/";
} else if (ttid == "24-08-01" ) {
  urlBase += "24-08-01/";
} else if (ttid == "24-10-01") {
  urlBase += "24-10-01/";
} else if (ttid == "24-10-28") {
  urlBase += "24-10-28/";
} else if (ttid == "24-11-04") {
  urlBase += "24-11-04/";
} else if (ttid == "24-12-11") {
  urlBase += "24-12-11/";
} else if (ttid == "25-01-01") {
  urlBase += "25-01-01/";
} else if (ttid == "25-03-01") {
  urlBase += "25-03-01/";
} else if (ttid == "25-04-01" || ((ttid == "null" || ttid == undefined) && !dateCond)) {
  urlBase += "25-04-01/";
  if (!dateCond) isCurrentTT = true;
} else if (ttid == "25-05-01" || ((ttid == "null" || ttid == undefined) && dateCond)) {
  urlBase += "25-05-01/";
  if (dateCond) isCurrentTT = true;
}

if (ttidPKS == "24-03-01") {
  urlBasePKS += "24-03-01/";
} else if (ttidPKS == "24-04-02") {
  urlBasePKS += "24-04-02/";
} else if (ttidPKS == "24-05-01") {
  urlBasePKS += "24-05-01/";
} else if (ttidPKS == "24-06-24") {
  urlBasePKS += "24-06-24/";
} else if (ttidPKS == "24-07-22") {
  urlBasePKS += "24-07-22/";
} else if (ttidPKS == "24-08-06") {
  urlBasePKS += "24-08-06/";
} else if (ttidPKS == "25-04-14") {
  urlBasePKS += "25-04-14/";
} else if (ttidPKS == "25-05-15" || ttidPKS == "null" || ttidPKS == undefined) {
  urlBasePKS += "25-05-15/";
  isCurrentTTPKS = true;
}

const directionReplacements = [
  {
    oldName: "Bardowskiego",
    newName: "Pl. Wolności"
  },
  {
    oldName: "Bardowskiego 04",
    newName: "Bardowskiego"
  },
  {
    oldName: "Dworzec Główny PKP",
    newName: "Piłsudskiego U. Wojewódzki"
  },
  {
    oldName: "Dworzec Główny PKP",
    newName: "Pl. Wolności"
  },
  {
    oldName: "Ustrzycka / Magórska",
    newName: "Ustrzycka Magórska"
  },
  {
    oldName: "Bratkowice",
    newName: "Bratkowice Las"
  },
  {
    oldName: "Pienińska pętla",
    newName: "Pienińska pętla 03"
  },
  {
    oldName: "Miłocińska",
    newName: "Miłocińska pętla 01"
  },
  {
    oldName: "Obr. Poczty Gdańskiej",
    newName: "Obr. Poczty Gdańskiej pętla 08"
  },
  {
    oldName: "Bratkowice Las",
    newName: "Bratkowice"
  },
  {
    oldName: "Jasionka PCN Łukasiewicz 14 nż",
    newName: "Jasionka PCN Łukasiewicz"
  },
  {
    oldName: "Olbrachta",
    newName: "Olbrachta pętla 09"
  },
  {
    oldName: "Bł. Karoliny 09",
    newName: "Bł. Karoliny"
  },
  {
    oldName: "Rudna Wielka zakręt 04 nż",
    newName: "Rudna Wielka"
  }
]

const calendarsList = [
  {
    ttid: "22-07-01",
    startDate: "2022-07-01",
    endDate: "2023-08-07"
  },
  {
    ttid: "23-10-01",
    startDate: "2023-10-01",
    endDate: "2023-10-29"
  },
  {
    ttid: "23-10-30",
    startDate: "2023-10-30",
    endDate: "2023-11-01"
  },
  {
    ttid: "23-11-02",
    startDate: "2023-11-02",
    endDate: "2023-11-17"
  },
  {
    ttid: "23-11-18",
    startDate: "2023-11-18",
    endDate: "2023-12-31"
  },
  {
    ttid: "24-01-01",
    startDate: "2024-01-01",
    endDate: "2024-01-28"
  },
  {
    ttid: "24-02-01",
    startDate: "2024-01-29",
    endDate: "2024-02-11"
  },
  {
    ttid: "24-01-01",
    startDate: "2024-02-12",
    endDate: "2024-02-29"
  },
  {
    ttid: "24-03-01",
    startDate: "2024-03-01",
    endDate: "2024-03-10"
  },
  {
    ttid: "24-03-11",
    startDate: "2024-03-11",
    endDate: "2024-03-17"
  },
  {
    ttid: "24-03-18",
    startDate: "2024-03-18",
    endDate: "2024-03-31"
  },
  {
    ttid: "24-04-01",
    startDate: "2024-04-01",
    endDate: "2024-04-30"
  },
  {
    ttid: "24-05-01",
    startDate: "2024-05-01",
    endDate: "2024-06-23"
  },
  {
    ttid: "24-06-24",
    startDate: "2024-06-24",
    endDate: "2024-06-30"
  },
  {
    ttid: "24-07-01",
    startDate: "2024-07-01",
    endDate: "2024-07-20"
  },
  {
    ttid: "24-07-21",
    startDate: "2024-07-21",
    endDate: "2024-07-31"
  },
  {
    ttid: "24-08-01",
    startDate: "2024-08-01",
    endDate: "2024-09-30"
  },
  {
    ttid: "24-10-01",
    startDate: "2024-10-01",
    endDate: "2024-10-27"
  },
  {
    ttid: "24-10-28",
    startDate: "2024-10-28",
    endDate: "2024-11-03"
  },
  {
    ttid: "24-11-04",
    startDate: "2024-11-04",
    endDate: "2024-12-10"
  },
  {
    ttid: "24-12-11",
    startDate: "2024-12-11",
    endDate: "2024-12-31"
  },
  {
    ttid: "25-01-01",
    startDate: "2025-01-01",
    endDate: "2025-02-28"
  },
  {
    ttid: "25-03-01",
    startDate: "2025-03-01",
    endDate: "2025-03-31"
  },
  {
    ttid: "25-04-01",
    startDate: "2025-04-01",
    endDate: "2025-12-31"
  }
]

class TripDispl {
  constructor(id, line, dir, t, th, tm, ts, nrTab, bilet) {
    this.id = id; //id kursu
    this.line = line; //linia
    this.dir = dir; //kierunek
    this.t = t; //czas (wyświetlany)
    this.th = th; //czas (godziny)
    this.tm = tm; //czas (minuty)
    this.ts = ts; //czas (sekundy)
    this.nrTab = nrTab; //nr pojazdu
    this.bilet = bilet; //czy posiada biletomat
  }
}
class Stop {
  constructor(id, name, code, lon, lat, routes) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.lon = lon;
    this.lat = lat;
    this.routes = routes;
    this.tm = "";
  }
}
class Day {
  constructor(dayType, dayDesc) {
    this.dayType = dayType; //skrót (PS, PW, SS, NS)
    this.dayDesc = dayDesc;
  }
}
class Vehicle {
  constructor(e, isJSON) {
    if (isJSON) {
      this.id = e.id;
      this.numPoj = e.id;
      this.nrLinii = e.nr.replace(/ /g, "");
      if (this.nrLinii == "...") {
        this.nrLinii = "Doj";
      } else if (this.nrLinii == "..") {
        this.nrLinii = "Zj";
      } else if (this.nrLinii == ".") {
        this.nrLinii = "PTech";
      }
      this.wariant = e.wt;
      this.kierunek = e.kr;
      this.idKursu = e.ik;
      this.numerPrzystanku = e.lp;
      this.drogaPlan = e.dp;
      this.drogaWykon = e.dw;
      this.cords = [e.y, e.x];
      this.prevCords = [e.py, e.px];
      this.odchylenie = e.o;
      this.stan = e.s;
      this.planRozp = e.p;
      this.kierTekst = e.op.replace(/\s+/g, ' ').trim();
      if (e.c == "B") {
        this.biletomat = true;
      } else {
        this.biletomat = false;
      }
      this.nastIdKursu = e.nk;
      this.nastNrLinii = e.nnr.replace(/ /g, "");
      this.nastWariant = e.nwt;
      this.nastKierunek = e.nkr;
      this.nastKierTekst = e.nop.replace(/\s+/g, ' ').trim();
      this.odjazdZa = e.is;
      this.serviceId = e.id_bryg;
      this.serviceCode = e.bryg_ozn;
      this.dayType = e.day_type;
    } else {
      this.id = e.getAttribute("id");
      this.numPoj = e.getAttribute("nb");
      this.nrLinii = e.getAttribute("nr").replace(/ /g, "");
      if (this.nrLinii == "...") {
        this.nrLinii = "Doj";
      } else if (this.nrLinii == "..") {
        this.nrLinii = "Zj";
      } else if (this.nrLinii == ".") {
        this.nrLinii = "PTech";
      }
      this.wariant = e.getAttribute("wt");
      this.kierunek = e.getAttribute("kr");
      this.idKursu = e.getAttribute("ik");
      this.numerPrzystanku = e.getAttribute("lp");
      this.drogaPlan = e.getAttribute("dp");
      this.drogaWykon = e.getAttribute("dw");
      this.cords = [e.getAttribute("y"), e.getAttribute("x")];
      this.prevCords = [e.getAttribute("py"), e.getAttribute("px")];
      this.odchylenie = e.getAttribute("o");
      this.stan = e.getAttribute("s");
      this.planRozp = e.getAttribute("p");
      this.kierTekst = e.getAttribute("op").replace(/\s+/g, ' ').trim();
      if (e.getAttribute("c") == "B") {
        this.biletomat = true;
      } else {
        this.biletomat = false;
      }
      this.nastIdKursu = e.getAttribute("nk");
      this.nastNrLinii = e.getAttribute("nnr").replace(/ /g, "");
      this.nastWariant = e.getAttribute("nwt");
      this.nastKierunek = e.getAttribute("nkr");
      this.nastKierTekst = e.getAttribute("nop").replace(/\s+/g, ' ').trim();
      this.odjazdZa = e.getAttribute("is");
    }
  }
}

class ServicePKS {
  constructor(obj) {
    this.id = obj.ID;
    this.dayType = obj.DayType;
    this.code = obj.DisplayName;
    this.acceptedVal = obj.AcceptedValues;
    this.trips = [];
    this.lines = [];
  }
  hasLine(line) {
    return this.lines.some(arrline => {
      return arrline == line;
    });
  }
  createLinesString() {
    let tempStr = "";
    this.lines.forEach((e) => {
      if (
        e != "Doj" &&
        e != "Zj" &&
        e != "PTech"
      ) {
        tempStr += "<div class='line-sq'>" + e + "</div>";
      }
    });
    tempStr = tempStr.slice(0, -2);
    return tempStr;
  }
  checkServiceType() {
    if (this.acceptedVal.length > 1 && this.code.indexOf("226") == -1) {
      this.serviceType = "2ZM";
      return;
    }
    const timeDiff = calculateTimeDifference(this.startTime, this.endTime);
    if (timeDiff.hours < 10)
      this.serviceType = "1ZM";
    else
      this.serviceType = "BIS";
  }
  getShiftTimeAndPartialDist() {
    this.distA = 0;
    this.distB = 0;
    if (this.serviceType == "2ZM") {
      for (let i = 0; i < this.trips.length - 1; i++) {
        this.distA += parseInt(this.trips[i].dist);
        if (this.trips[i].Brygada == this.acceptedVal[0] && this.trips[i + 1].Brygada == this.acceptedVal[1]) {
          this.trips[i].shift = "B";
          this.shiftTime = this.trips[i].endTime;
          this.shiftTime2 = this.trips[i + 1].startTime;
          if (this.shiftTime[0] == "0")
            this.shiftTime = this.shiftTime.slice(1);
          if (this.shiftTime2[0] == "0")
            this.shiftTime2 = this.shiftTime2.slice(1);
          break;
        }
      }
      this.distB = this.dist - this.distA;
    } else if (this.serviceType == "BIS") {
      let longestBreak = {
        sId: 0,
        time: { hours: 0, minutes: 0 }
      }
      for (let i = 0; i < this.trips.length - 1; i++) {
        const tempTime = calculateTimeDifference(this.trips[i].endTime, this.trips[i + 1].startTime);
        if (tempTime.hours * 60 + tempTime.minutes > longestBreak.time.hours * 60 + longestBreak.time.minutes)
          longestBreak = {
            sId: i,
            time: tempTime
          }
      }
      this.trips[longestBreak.sId].shift = "P";
      this.shiftTime = this.trips[longestBreak.sId].endTime;
      this.shiftTime2 = this.trips[longestBreak.sId + 1].startTime;
      if (this.shiftTime[0] == "0")
        this.shiftTime = this.shiftTime.slice(1);
      if (this.shiftTime2[0] == "0")
        this.shiftTime2 = this.shiftTime2.slice(1);
      for (let i = 0; i <= longestBreak.sId; i++)
        this.distA += parseInt(this.trips[i].dist);
      this.distB = this.dist - this.distA;
    }
  }
}

class Service {
  constructor(id, code, mainLineId, lines, dayType, startTime) {
    this.id = id;
    this.code = code;
    this.mainLineId = mainLineId;
    this.lines = lines;
    this.dayType = dayType;
    this.startTime = startTime.slice(2, -1).replace("H", ":");
    if (this.startTime.indexOf(":") >= this.startTime.length - 2) {
      this.startTime =
        this.startTime.slice(0, this.startTime.indexOf(":") + 1) +
        "0" +
        this.startTime.slice(this.startTime.indexOf(":") + 1);
    }
    this.trips = [];
    if (!Array.isArray(this.lines))
      this.lines = [this.lines];
    this.rezerwy = [];
  }
  hasLine(line) {
    return this.lines.some(arrline => {
      return arrline.LineName == line;
    });
  }
  createLinesString() {
    let tempStr = "";
    if (Array.isArray(this.lines)) {
      this.lines.forEach((e) => {
        if (
          e.LineName != "Doj" &&
          e.LineName != "Zj" &&
          e.LineName != "PTech"
        ) {
          tempStr += "<div class='line-sq'>" + e.LineName + "</div>";
        }
      });
      tempStr = tempStr.slice(0, -2);
    } else {
      tempStr = "<div class='line-sq'>" + this.lines.LineName + "</div>";
    }
    return tempStr;
  }
  checkServiceType() {
    for (let i = 0; i < this.trips.length; i++) {
      if (this.trips[i].shift == "B") {
        this.serviceType = "2ZM";
        return;
      } else if (this.trips[i].shift == "P") {
        this.serviceType = "BIS";
        return;
      }
    }
    const timeDiff = calculateTimeDifference(this.startTime, this.trips.at(-1).endTime);
    if (timeDiff.hours < 10)
      this.serviceType = "1ZM";
    else {
      let longestBreak = {
        sId: 0,
        time: { hours: 0, minutes: 0 }
      }
      for (let i = 0; i < this.trips.length - 1; i++) {
        const tempTime = calculateTimeDifference(this.trips[i].endTime, this.trips[i + 1].startTime);
        if (tempTime.hours * 60 + tempTime.minutes > longestBreak.time.hours * 60 + longestBreak.time.minutes)
          longestBreak = {
            sId: i,
            time: tempTime
          }
      }
      if ((timeDiff.hours * 60 + timeDiff.minutes - longestBreak.time.hours * 60 - longestBreak.time.minutes) / 60 < 10) {
        this.serviceType = "BIS";
        this.trips[longestBreak.sId].shift = "P";
      } else {
        this.serviceType = "ND";
      }
    }
  }
  getShiftTime() {
    let ctr = 0;
    this.trips.forEach((trip) => {
      if (trip.shift == "B") {
        if (trip.shiftTime != undefined) {
          this.shiftTime = trip.shiftTime;
          this.shiftTime2 = trip.shiftTime;
          return;
        }
        if (trip.t1len < trip.times.length) {
          let shiftMinutes =
            parseInt(trip.startTime.substring(0, trip.startTime.indexOf(":"))) *
            60 +
            parseInt(trip.startTime.substring(trip.startTime.indexOf(":") + 1));
          for (let i = 0; i < trip.t1len - 1; i++) {
            shiftMinutes += parseInt(trip.times[i]);
          }
          let tempMin = shiftMinutes % 60;
          if (tempMin < 10) {
            tempMin = "0" + tempMin;
          }
          this.shiftTime = parseInt(shiftMinutes / 60) + ":" + tempMin;
          this.shiftTime2 = this.shiftTime;
          return;
        } else {
          let shiftMinutes =
            parseInt(trip.endTime.substring(0, trip.endTime.indexOf(":"))) *
            60 +
            parseInt(trip.endTime.substring(trip.endTime.indexOf(":") + 1)) +
            4;
          let shiftMinutes2 =
            parseInt(
              this.trips[ctr + 1].startTime.substring(
                0,
                this.trips[ctr + 1].startTime.indexOf(":")
              )
            ) *
            60 +
            parseInt(
              this.trips[ctr + 1].startTime.substring(
                this.trips[ctr + 1].startTime.indexOf(":") + 1
              )
            ) -
            4;
          if (shiftMinutes <= shiftMinutes2) {
            let tempMin = shiftMinutes % 60;
            if (tempMin < 10) {
              tempMin = "0" + tempMin;
            }
            this.shiftTime = parseInt(shiftMinutes / 60) + ":" + tempMin;
            tempMin = shiftMinutes2 % 60;
            if (tempMin < 10) {
              tempMin = "0" + tempMin;
            }
            this.shiftTime2 = parseInt(shiftMinutes2 / 60) + ":" + tempMin;
          } else {
            let tempMin = shiftMinutes % 60;
            if (tempMin < 10) {
              tempMin = "0" + tempMin;
            }
            this.shiftTime = parseInt(shiftMinutes / 60) + ":" + tempMin;
            this.shiftTime2 = this.shiftTime;
          }
        }
      }
      ctr++;
    });
  }
  operatesOnDayType(dayType) {
    if (Array.isArray(this.dayType))
      if (this.dayType.indexOf(dayType) > -1) return true;
      else return false;
    else
      if (this.dayType == dayType) return true;
      else return false;
  }
  operatesOnDateTime(dateOb) {
    let dayType = getDayType(dateOb);
    let hourShift = 0;
    if (dateOb.getHours() < 2 || (dateOb.getHours() < 6 && this.code[0] == "N")) {
      dayType = dayType.dayTypeYest;
      hourShift = 24;
    }
    else dayType = dayType.dayType;

    if (!this.operatesOnDayType(dayType)) return false;

    const selTime = dateOb.getHours() * 60 + dateOb.getMinutes() + hourShift * 60;

    for (let i = 0; i < this.trips.length; i++) {
      if (this.trips[i].lineId == '10' || this.trips[i].lineId == '6' || this.trips[i].lineId == '23') continue;
      const sTime = parseInt(this.trips[i].startTime.split(":")[0]) * 60 + parseInt(this.trips[i].startTime.split(":")[1]) + hourShift * 60;
      let eTime = parseInt(this.trips[i].endTime.split(":")[0]) * 60 + parseInt(this.trips[i].endTime.split(":")[1]) + hourShift * 60;

      if (eTime < sTime) eTime += (24 * 60);

      if (selTime >= sTime && selTime <= eTime) return true;
    }
    return false;
  }
}
class Trip {
  constructor(id, serId, linId, vari, seq, dep, end, times, times2, shift, shiftTime, dep2, servStart) {
    this.id = id;
    this.serviceId = serId;
    this.lineId = linId;
    this.variantId = vari;
    this.order = parseInt(seq);
    this.startTime = dep.substr(0, 5);
    if (this.startTime[0] == "0") {
      this.startTime = this.startTime.substr(1);
    }
    this.endTime = end.substr(0, 5);
    if (this.endTime[0] == "0") {
      this.endTime = this.endTime.substr(1);
    }
    this.shift = shift;
    this.shiftTime = shiftTime;
    if (shift == "B") {
      this.t1len = times.length;
      if (times2 == undefined) {
        this.endShift = "B";
        this.times = times;
      } else {
        this.times = times.concat(times2);
      }
    } else {
      this.times = times;
    }
    if (this.shift != "B" && this.shift != "P" && times2 != null) {
      if (Array.isArray(times2)) {
        times2.forEach(el => {
          this.times.push(el);
        })
      } else {
        this.times.push(times2);
      }
    }
    if (dep2 != null) {
      this.startTime2 = dep2.substr(0, 5);
      if (this.startTime2[0] == "0") {
        this.startTime2 = this.startTime2.substr(1);
      }
    }
    this.servStart = servStart;
  }
}
class Line {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
class Route {
  constructor(id, line, stops, dir, dist, distArr, desc, dirBool, isDef) {
    this.id = id;
    for (let i = 0; i < arrayOfLines.length; i++) {
      if (arrayOfLines[i].id == line) {
        this.line = arrayOfLines[i].name;
      }
    }
    this.stops = stops;
    this.direction = dir;
    this.distance = dist;
    this.distanceArray = distArr;
    this.description = desc;
    dirBool == "inbound" ? this.dir = 1 : this.dir = 0;
    isDef == "true" ? this.isDefault = true : this.isDefault = false;
  }
}
class VehiclePKS {
  constructor(vehicle) {
    this.id = String(vehicle.vehicle_id).padStart(3, '0');
    if(this.id == '064'){
      this.id = '063';
    }
    if (vehicle.journey != null) {
      this.service = vehicle.journey.service.service_code;
      this.service = this.service.replace("A+", "+A");
      this.service = this.service.replace("B+", "+B");
      this.service = this.service.replace("C+", "+C");
      this.route = vehicle.journey.route.name;
      this.destination = vehicle.journey.route.description;
      this.line = vehicle.journey.line.line_name;
      this.delay = vehicle.delay * -1;
    } else {
      this.service = "N/D";
      this.destination = "Niezalogowany";
      this.line = "N/D"
      this.delay = 0;
    }
    if (vehicle.position != null) {
      this.pos_date = vehicle.position.position_date;
      this.cords = [vehicle.position.lat, vehicle.position.long];
    }
  }
}
function displayStopSchedule(stopData) {
  let schedule = stopData.querySelector("Schedules"); //pobranie obiektu z xml-a
  let arrayOfTrips = []; //tablica z kursami
  let currentTime = schedule.getAttribute("time"); //godzina pobrania rozkładu
  let stopEl = schedule.querySelector("Stop");
  let stop = new Stop(stopEl.getAttribute("id"), stopEl.getAttribute("name"));
  let stopHeader = document.querySelector("#stop-header");
  stopHeader.textContent = stop.name;
  let dayEl = stopEl.querySelector("Day");
  let day = new Day(dayEl.getAttribute("type"), dayEl.getAttribute("desc"));
  let arrayOfR = dayEl.querySelectorAll("R");
  for (let i = 0; i < arrayOfR.length; i++) {
    let currEl = arrayOfR[i];
    let sEl = currEl.querySelector("S");
    let hasTicketMachine = false;
    if (currEl.getAttribute("vuw") == "B") {
      hasTicketMachine = true;
    }
    let tempTrip = new TripDispl(
      sEl.getAttribute("id"),
      currEl.getAttribute("nr"),
      currEl.getAttribute("dir"),
      sEl.getAttribute("t"),
      sEl.getAttribute("th"),
      sEl.getAttribute("tm"),
      sEl.getAttribute("s"),
      sEl.getAttribute("nb"),
      hasTicketMachine
    );
    arrayOfTrips.push(tempTrip);
  }
  let tbody = document.querySelector("#t-table-body");
  tbody.innerHTML = "";
  arrayOfTrips.forEach((e) => {
    let tr = document.createElement("tr");
    let td = [
      document.createElement("td"),
      document.createElement("td"),
      document.createElement("td"),
      document.createElement("td"),
    ];
    if (e.t == "<1min") {
      td[2].classList.add("red-dep");
    } else if (e.t.includes("min")) {
      td[2].classList.add("blue-dep");
    }
    let tdTxtNode = [
      document.createTextNode(e.line),
      document.createTextNode(e.dir),
      document.createTextNode(e.t),
      document.createTextNode(e.nrTab),
    ];
    for (let i = 0; i < 4; i++) {
      td[i].appendChild(tdTxtNode[i]);
      tr.appendChild(td[i]);
    }
    tbody.appendChild(tr);
  });
  currentStopDisp = stop.id;
}
function getStopScheduleData(stopId) {
  if (stopId > 0) {
    $.ajax({
      type: "GET",
      url: "php/download.php?sid=" + stopId,
      dataType: "xml",
    }).done(function (data) {
      displayStopSchedule(data);
      currentRefreshCounter = 10;
      refCounterEl.textContent = currentRefreshCounter;
    });
  }
}
function allStopsToTable(dataJSON) {
  dataJSON.forEach((e) => {
    /* elementy tablicy:
        [0] - id
        [1] - nazwa
        [2] - kod
        [3] - id_cfg (?
        [4, 5] - coords
        [6] - pic (?)
        [7] - linie*/
    let tempStop = new Stop(e[0], e[1], e[2], e[4], e[5], e[7]);
    arrayOfStops.push(tempStop);
  });
  arrayOfStops.sort(stopsSort);
}
function stopsSort(a, b) {
  if (a.name.toUpperCase() < b.name.toUpperCase()) {
    return -1;
  } else {
    return 1;
  }
}
function getAllStopsJSON() {
  $.ajax({
    type: "GET",
    url: "php/download2.php",
    dataType: "JSON",
  }).done(function (data) {
    allStopsToTable(data);
  });
}

//function below is from w3schools.com
function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (
        arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML =
          "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].name.substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
          closeAllLists();
          let stopId = -1;
          for (let i = 0; i < arrayOfStops.length; i++) {
            if (arrayOfStops[i].name == inp.value) {
              stopId = arrayOfStops[i].id;
              break;
            }
          }
          if (stopId > -1) {
            getAllSchedules(stopId, sNameInput.value);
          }
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
//end of w3schools.com code
function getVehicles(skip, refSV) {
  $.ajax({
    type: "GET",
    url: "php/download3.php",
    dataType: "xml"
  }).done(function (data) {
    vehicleDataToArray(data, skip, refSV);
  });
}
function vehicleDataToArray(xmlVeh, skip, refSV) {
  let vehiclesList = xmlVeh.querySelectorAll("V");
  arrayOfVehicles = [];
  vehiclesList.forEach((e) => {
    let tempVehicle = new Vehicle(e);
    arrayOfVehicles.push(tempVehicle);
  });
  if (skip != true) {
    displayVehiclesOnMap();
  } else if (refSV == true) {
    if (selDT != "")
      displayServices(selDT, tblBody);
  }
}
function displayVehiclesOnMap(skipLF) {
  let restoreSelection = currSelVeh;
  clearOverlays();
  if (!currInfoFilters.ztm) {
    displayPKSVehicles();
    return;
  }
  arrayOfVehicles.forEach((e) => {
    let ckbSelector = "#fline-";
    if (parseInt(e.idKursu) != 0) {
      ckbSelector += e.nrLinii;
    } else {
      ckbSelector += e.nastNrLinii;
    }
    if (skipLF)
      ckbSelector = "#tempckb";
    if (document.querySelector(ckbSelector) !== null) {
      if (document.querySelector(ckbSelector).checked) {
        const markerPos = {
          lat: parseFloat(e.cords[0]),
          lng: parseFloat(e.cords[1]),
        };
        const vehData = document.createElement("div");
        const vehDataStany = document.createElement("div");
        vehDataStany.classList.add("stany");
        vehData.classList.add("veh-data");
        if (e.stan == "3" || e.stan == "6" || e.stan == "7" || e.stan == "10") {
          vehData.classList.add("orange-bg");
        }
        if (e.kierTekst == "PRZEJAZD TECHNICZNY") {
          vehData.classList.add("red-bg");
        }
        let vehTempHTML = "";
        let linia = "";

        if (e.stan == 2) vehDataStany.innerHTML += "<div class='stan-el stan-przyst'>Przyst.</div>"
        if (e.stan == 3) vehDataStany.innerHTML += "<div class='stan-el stan-petla'>Pętla</div>"
        if (e.stan == 5) vehDataStany.innerHTML += "<div class='stan-el stan-nieznany'>Nieznany</div>"
        if (e.stan == 6) vehDataStany.innerHTML += "<div class='stan-el stan-petla'>Pętla potw.</div>"
        if (e.stan == 7) vehDataStany.innerHTML += "<div class='stan-el stan-petla'>Pętla potw.??</div>"
        if (e.stan == 10) vehDataStany.innerHTML += "<div class='stan-el stan-petla'>Pętla potw.(SYM)</div>"
        if (e.uwaga == 130) vehDataStany.innerHTML += "<div class='stan-el stan-nieznany'>Brak zm. GPS</div>"

        vehData.append(vehDataStany);

        if (parseInt(e.idKursu) != 0) {
          linia = e.nrLinii
          vehTempHTML +=
            '<div class="veh-data-row">';
          if (currInfoFilters.line) {
            vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-l"></i><span>' +
              e.nrLinii +
              '</span></div>';
          }
          if (currInfoFilters.tab) {
            vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-bus-simple"></i><span id="nb">' +
              e.numPoj +
              '</span></div>';
          }
          vehTempHTML += '</div><div class="veh-data-row">'
          if (currInfoFilters.dir) {
            vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-k"></i><span>' +
              e.kierTekst +
              "</span></div>";
          }
          vehTempHTML += '</div>';
        } else {
          linia = e.nastNrLinii
          vehTempHTML +=
            '<div class="veh-data-row">';
          if (currInfoFilters.line) {
            vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-l"></i><span>' +
              e.nastNrLinii +
              '</span></div>';
          }
          if (currInfoFilters.tab) {
            vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-bus-simple"></i><span id="nb">' +
              e.numPoj +
              '</span></div>';
          }
          vehTempHTML += '</div><div class="veh-data-row">'
          if (currInfoFilters.dir) {
            vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-k"></i><span>' +
              e.nastKierTekst +
              "</span></div>";
          }
          vehTempHTML += '</div>';
        }
        if (currInfoFilters.bryg) {
          let foundService = getServiceFromVehicle(e, new Date());
          let serviceCode;
          if (foundService != null) {
            serviceCode = foundService.code;
          } else {
            serviceCode = "---";
          }
          vehTempHTML += '<div class="veh-data-row"><div class="veh-data-el"><i class="fa-solid fa-b"></i><span id="vbryg">' + serviceCode + '</span></div></div>';
        }
        if (currInfoFilters.delay) {
          let odchylenie = 0;
          let sek = "";
          let timeCl = "";
          if (Math.abs(e.odchylenie % 60) < 10) {
            sek = "0" + Math.abs(e.odchylenie % 60);
          } else {
            sek = Math.abs(e.odchylenie % 60);
          }
          if (Math.sign(e.odchylenie) == "1") {
            odchylenie = "+" + Math.abs(parseInt(e.odchylenie / 60)) + ":" + sek;
            timeCl = "time-gr";
          } else if (Math.sign(e.odchylenie) == "-1") {
            odchylenie = "-" + Math.abs(parseInt(e.odchylenie / 60)) + ":" + sek;
            timeCl = "time-rd";
          } else {
            odchylenie = Math.abs(parseInt(e.odchylenie / 60)) + ":" + sek;
            timeCl = "time-wh";
          }
          vehTempHTML +=
            '<div class="veh-data-el"><i class="fa-solid fa-clock ' +
            timeCl +
            '"></i><span>' +
            odchylenie +
            "</span></div>";
        }
        vehData.innerHTML += vehTempHTML;
        if (vehDataStany.innerHTML == "") vehData.classList.add("ukryj-stany");
        if (linia == selectedLine || skipLF != true) {
          var marker = new google.maps.marker.AdvancedMarkerView({
            position: markerPos,
            map: map,
            content: vehData,
          });

          marker.element.addEventListener("click", () => {
            highlight(marker);
          });
          markers.push(marker);
          if (restoreSelection != null && restoreSelection == e.numPoj) {
            highlight(markers.at(-1));
          }
        }
      }
    }
  });
  if (skipLF == undefined) {
    arrayOfLines.forEach(line => {
      let tempVehCtr = 0;
      for (let i = 0; i < arrayOfVehicles.length; i++) {
        let tempLinia;
        if (parseInt(arrayOfVehicles[i].idKursu) != 0) {
          tempLinia = arrayOfVehicles[i].nrLinii;
        } else {
          tempLinia = arrayOfVehicles[i].nastNrLinii;
        }
        if (tempLinia == line.name) tempVehCtr++;
      }
      let tempSelector = "label[for='fline-" + line.name + "']";
      let tempCtrEl = document.createElement("span");
      tempCtrEl.classList.add("veh-count");
      tempCtrEl.innerText = tempVehCtr;
      let tempDivEl = document.querySelector(tempSelector).parentElement.querySelector("span");
      if (tempDivEl != null) {
        tempDivEl.remove();
      }
      document.querySelector(tempSelector).parentElement.appendChild(tempCtrEl);
    })
    displayPKSVehicles();
  }
}
function getTtDataForVehicle(nb, callback) {
  $.ajax({
    type: "GET",
    url: "php/download4.php?nb=" + nb,
    dataType: "xml",
  }).done(function (data) {
    let schedule = data.querySelector("Schedules");
    let stops = schedule.querySelectorAll("Stop");
    let tempNextStops = [];
    for (let i = 0; i < stops.length; i++) {
      let tempStop = new Stop(
        stops[i].getAttribute("id"),
        stops[i].getAttribute("name")
      );
      tempStop.tm = stops[i].getAttribute("tm");
      tempStop.th = stops[i].getAttribute("th");
      tempStop.lp = stops[i].getAttribute("lp");
      tempNextStops.push(tempStop);
    }
    callback(tempNextStops);
  });
}
function createStopsListHTML(vehStops) {
  let sContent = document.createElement("div");
  sContent.classList.add("details");
  vehStops.forEach((e) => {
    if (e.th == "") {
      sContent.innerHTML +=
        "<div class='veh-stop'><span class='stop-name'>" +
        e.name +
        "</span><span class='stop-time'>" +
        e.tm +
        "</span></div>";
    } else {
      sContent.innerHTML +=
        "<div class='veh-stop'><span class='stop-name'>" +
        e.name +
        "</span><span class='stop-time'>" +
        (e.th + ":" + e.tm) +
        "</span></div>";
    }
  });
  return sContent;
}
function getAllServices() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBase + "services.json",
    dataType: "json"
  }).done(function (data) {
    data.forEach((e) => {
      let tempService = new Service(
        e.ServiceCode,
        e.PrivateCode,
        e.MainLineID,
        e.Lines.Line,
        e.DayTypes.DayTypeRef,
        e.StartTime
      );
      arrayOfServices.push(tempService);
    });
    arrayOfServices.sort(sortServices);
    getAllTrips();
  });
}

async function displayServices(dayType, tbodyEl) {
  getAllServicesForVehicles(new Date());
  tbodyEl.innerHTML = "";
  let today0 = new Date();
  let tzoffset = new Date().getTimezoneOffset() * 60000;
  let today = new Date(today0 - tzoffset);
  today = today.toISOString().split('T')[0];
  arrayOfServices.forEach((e) => {
    //skip services which do not operate on selected dayType
    if (Array.isArray(e.dayType)) {
      if (!e.dayType.includes(dayType)) {
        return;
      }
    } else {
      if (e.dayType != dayType) {
        return;
      }
    }
    if (e.code.startsWith(searchServiceItp.value) && (e.hasLine(searchLineItp.value) || searchLineItp.value == "")) {
      //display service in table
      let tempNewRow = tbodyEl.insertRow(-1);
      let newCell1 = tempNewRow.insertCell(-1);
      let newCell2 = tempNewRow.insertCell(-1);
      let newCell3 = tempNewRow.insertCell(-1);
      newCell3.classList.add("tblVehNo");
      newCell3.setAttribute("id", "veh-sv-" + e.id)
      let newCell4 = tempNewRow.insertCell(-1);
      let newCell5 = tempNewRow.insertCell(-1);
      let newCell6 = tempNewRow.insertCell(-1);
      newCell1.innerHTML =
        "<a href='brygdet.php?id=" + e.id + "&ttid=" + ttid + "'>" + e.code + "</a>";
      if (e.serviceType == "1ZM") {
        newCell1.classList.add("brig1zm");
      } else if (e.serviceType == "BIS") {
        newCell1.classList.add("brigbis");
      } else if (e.serviceType == "ND") {
        newCell1.classList.add("red-bg");
      }
      newCell1.classList.add("bold-txt");
      newCell2.innerHTML = e.createLinesString();
      let vehicleLogged = false;
      for (let i = 0; i < arrayOfVehicles.length; i++) {
        if (arrayOfVehicles[i].serviceOb == null)
          continue;
        if (arrayOfVehicles[i].serviceOb.id == e.id) {
          newCell3.innerHTML = '<i class="fa-solid fa-wifi" style="color: #77dd77;"></i> ' + arrayOfVehicles[i].id;
          vehicleLogged = true;
          break;
        }
      }
      if (!vehicleLogged) {
        const condition = element => element.vehicle.serviceId == e.id;
        const filteredArray = arrayVehHistory.filter(condition);
        if (filteredArray.length > 0 && isCurrentTT) {
          newCell3.innerHTML = '<i class="fa-solid fa-wifi" style="color: #fff761;"></i> <span tabindex="0" class="more-info" title="' + formatTimeHMM(filteredArray.at(-1).date) + '">' + filteredArray.at(-1).vehicle.id + "</span>";
        } else {
          newCell3.innerHTML = '<i class="fa-solid fa-wifi" style="color: #ff6961;"></i>';
        }
        newCell3.classList.add("missing");
        if (isCurrentTT)
          if (e.operatesOnDateTime(new Date())) newCell3.classList.add("missing-veh");
      }
      newCell4.textContent = e.startTime;
      try {
        newCell5.textContent = e.trips[e.trips.length - 1].endTime;
      } catch (error) {
        console.log(e);
      }
      newCell6.textContent = (e.totalDist / 1000).toFixed(3);
    }
  });
  if (isCurrentTT)
    try {
      await getHistoryData(today, today);
      const missingVeh = tbodyEl.querySelectorAll("tr .tblVehNo.missing");
      missingVeh.forEach(cell => {
        const condition = element => element.vehicle.serviceId == cell.id.substring(7);
        const filteredArray = arrayVehHistory.filter(condition);
        if (filteredArray.length > 0 && isCurrentTT) {
          cell.innerHTML = '<i class="fa-solid fa-wifi" style="color: #fff761;"></i> <span tabindex="0" class="more-info" title="' + formatTimeHMM(filteredArray.at(-1).date) + '">' + filteredArray.at(-1).vehicle.id + "</span>";
          cell.classList.remove("missing");
        }
      })
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
}
function sortServices(a, b) {
  if (typeof a.code === "undefined") {
    if (b.service == undefined)
      return -1;
    if (a.service == undefined)
      return 1;
    a = a.service;
    b = b.service;
  }
  let fVal = a.code;
  let sVal = b.code;
  let fValA = fVal.slice(0, fVal.indexOf("/"));
  let fValB = fVal.slice(fVal.indexOf("/") + 1);
  let sValA = sVal.slice(0, sVal.indexOf("/"));
  let sValB = sVal.slice(sVal.indexOf("/") + 1);
  const linesOrder = ["A", "B", "C", "D", "F", "G", "H", "G", "K", "M", "S", "G2A", "N1", "N2", "N3", "Doj", "PTech", "Zj"];
  if (fValA == "0A" && sValA != "0A") {
    return -1;
  } else if (sValA == "0A" && fValA != "0A") {
    return 1;
  } else if (fValA == "0B" && sValA != "0B") {
    return -1;
  } else if (sValA == "0B" && fValA != "0B") {
    return 1;
  } else if (isNaN(fValA[0]) || isNaN(sValA[0])) {
    if (isNaN(fValA) && !isNaN(sValA)) {
      return 1;
    } else if (isNaN(sValA) && !isNaN(fValA)) {
      return -1;
    } else {
      if (linesOrder.indexOf(fValA) < linesOrder.indexOf(sValA)) {
        return -1;
      } else if (linesOrder.indexOf(fValA) != linesOrder.indexOf(sValA)) {
        return 1;
      } else {
        return parseInt(fValB) - parseInt(sValB);
      }
    }
  } else if (parseInt(fValA) < parseInt(sValA)) {
    return -1;
  } else if (parseInt(sValA) < parseInt(fValA)) {
    return 1;
  } else if (parseInt(fValB) < parseInt(sValB)) {
    return -1;
  } else {
    return 1;
  }
}

function sortServicesPKS(a, b) {
  let fVal = a.code;
  let sVal = b.code;
  let fValA = parseInt(fVal.slice(0, 3));
  let fValB = fVal.slice(3).replace('/', '');
  let sValA = parseInt(sVal.slice(0, 3));
  let sValB = sVal.slice(3).replace('/', '');

  if (fValA < sValA) return -1;
  if (sValA < fValA) return 1;

  const brygOrder = ['1', '2', 'R2', '3', 'R3', '3ŚR', 'R3ŚR', '4', 'R4', '4PT', 'R4PT', '5', '6', '+', 'AB6', 'C6', 'CD6', '+A', '+B', '+AB', '+C', 'S'];
  if (brygOrder.indexOf(fValB) < brygOrder.indexOf(sValB)) return -1;
  if (brygOrder.indexOf(fValB) > brygOrder.indexOf(sValB)) return 1;
  return 0;

}

function getAllTrips() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBase + "trips.json?v=25-03-23v1",
    dataType: "json"
  }).done(function (data) {
    totalTrips = data.length;
    data.forEach((e) => {
      let tempRT1 = undefined;
      if (e.RT1 == undefined)
        tempRT1 = e["RT#1"];
      else
        tempRT1 = e.RT1;
      let tempTrip = new Trip(
        e.VehicleJourneyCode,
        e.ServiceRef,
        e.LineRef,
        e.JourneyPatternRef,
        e.SequenceOnBrigade,
        e.DepartureTime,
        e.EndTime,
        e.RT,
        tempRT1,
        e.Shift,
        e.ShiftTime,
        e.DepartureTime2,
        e.ServiceStart
      );
      for (let i = 0; i < arrayOfServices.length; i++) {
        if (arrayOfServices[i].id == tempTrip.serviceId) {
          arrayOfServices[i].trips.push(tempTrip);
          break;
        }
      }
    });
    pobierzRezerwy();
  });
}

function pobierzRezerwy() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBase + "rezerwy.json?v=25-03-23v1",
    dataType: "json"
  }).done(function (data) {
    data.forEach(rezerwa => {
      for (let i = 0; i < arrayOfServices.length; i++) {
        if (arrayOfServices[i].id == rezerwa.idBrygady) {
          arrayOfServices[i].rezerwy.push(rezerwa);
          break;
        }
      }
    })

    sortTrips();
    arrayOfServices.forEach((service) => {
      service.checkServiceType();
    });
  }).fail(() => {
    sortTrips();
    arrayOfServices.forEach((service) => {
      service.checkServiceType();
    });
  })
}

function sortTrips() {
  arrayOfServices.forEach((e) => {
    e.trips.sort(tripsOrder);
  });
  getLines();
}

function tripsOrder(a, b) {
  if (a.order < b.order) {
    return -1;
  } else {
    return 1;
  }
}

function displayServiceDetails(id, tbodyEl) {
  for (let i = 0; i < arrayOfServices.length; i++) {
    if (arrayOfServices[i].id == id) {
      brygCodeEl.textContent = arrayOfServices[i].code;
      if (Array.isArray(arrayOfServices[i].dayType)) {
        dayTypeDet.textContent = "Rozkład roboczy";
      } else if (arrayOfServices[i].dayType == "4") {
        dayTypeDet.textContent = "Rozkład roboczy szkolny";
      } else if (arrayOfServices[i].dayType == "1") {
        dayTypeDet.textContent = "Rozkład roboczy wolny od nauki szkolnej";
      } else if (arrayOfServices[i].dayType == "2") {
        dayTypeDet.textContent = "Rozkład sobotni";
      } else if (arrayOfServices[i].dayType == "3") {
        dayTypeDet.textContent = "Rozkład niedzielny, świąteczny";
      }
      document.title = "Rozkład brygady: " + arrayOfServices[i].code;
      //insert service overview here
      if (arrayOfServices[i].serviceType == "1ZM") {
        brygTypeEl.textContent = "Brygada jednozmianowa";
        let tempNewRow2 = brygStatsEl.insertRow(-1);
        let tempNewCell1 = tempNewRow2.insertCell(-1);
        let tempNewCell2 = tempNewRow2.insertCell(-1);
        let tempNewCell3 = tempNewRow2.insertCell(-1);
        let tempNewCell4 = tempNewRow2.insertCell(-1);
        let tempNewCell5 = tempNewRow2.insertCell(-1);
        if (parseInt(arrayOfServices[i].startTime.split(":")[0]) < 10)
          tempNewCell1.textContent = "A";
        else if (arrayOfServices[i].code.indexOf("N") == -1)
          tempNewCell1.textContent = "B";
        else
          tempNewCell1.textContent = "C";
        let startMinutes =
          parseInt(
            arrayOfServices[i].startTime.substring(
              0,
              arrayOfServices[i].startTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServices[i].startTime.substring(
              arrayOfServices[i].startTime.indexOf(":") + 1
            )
          );
        if ((arrayOfServices[i].dayType == '2' || arrayOfServices[i].dayType == '3') && parseInt(arrayOfServices[i].startTime.split(":")[0]) >= 7 && arrayOfServices[i].code[0] != "N") {
          startMinutes -= 10;
        } else if (arrayOfServices[i].trips[0].lineId != "10") {
          startMinutes -= 6;
        } else {
          startMinutes -= 4;
        }
        if (startMinutes < 0) {
          startMinutes += 1440;
        }
        let tempMin = startMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        let newMinutesStr = parseInt(startMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        let endMinutes =
          parseInt(
            arrayOfServices[i].trips[
              arrayOfServices[i].trips.length - 1
            ].endTime.substring(
              0,
              arrayOfServices[i].trips[
                arrayOfServices[i].trips.length - 1
              ].endTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServices[i].trips[
              arrayOfServices[i].trips.length - 1
            ].endTime.substring(
              arrayOfServices[i].trips[
                arrayOfServices[i].trips.length - 1
              ].endTime.indexOf(":") + 1
            )
          );
        endMinutes += 4;
        if (endMinutes >= 1440) {
          endMinutes -= 1440;
        }
        tempMin = endMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(endMinutes / 60) + ":" + tempMin;
        tempNewCell3.textContent = newMinutesStr;
        let finalMinutes;
        if (endMinutes > startMinutes) {
          finalMinutes = endMinutes - startMinutes;
        } else {
          finalMinutes = endMinutes - startMinutes + 1440;
        }
        tempMin = finalMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(finalMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = (arrayOfServices[i].totalDist / 1000).toFixed(3);
      } else if (arrayOfServices[i].serviceType == "BIS") {
        brygTypeEl.textContent = "Brygada szczytowa";
        let tempNewRow2 = brygStatsEl.insertRow(-1);
        let tempNewCell1 = tempNewRow2.insertCell(-1);
        let tempNewCell2 = tempNewRow2.insertCell(-1);
        let tempNewCell3 = tempNewRow2.insertCell(-1);
        let tempNewCell4 = tempNewRow2.insertCell(-1);
        let tempNewCell5 = tempNewRow2.insertCell(-1);
        tempNewCell1.textContent = "A (BIS)";
        let startMinutes =
          parseInt(
            arrayOfServices[i].startTime.substring(
              0,
              arrayOfServices[i].startTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServices[i].startTime.substring(
              arrayOfServices[i].startTime.indexOf(":") + 1
            )
          );
        if ((arrayOfServices[i].dayType == '2' || arrayOfServices[i].dayType == '3') && parseInt(arrayOfServices[i].startTime.split(":")[0]) >= 7 && arrayOfServices[i].code[0] != "N") {
          startMinutes -= 10;
        } else if (arrayOfServices[i].trips[0].lineId != "10") {
          startMinutes -= 6;
        } else {
          startMinutes -= 4;
        }
        if (startMinutes < 0) {
          startMinutes += 1440;
        }
        let tempMin = startMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        let newMinutesStr = parseInt(startMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        let partEndTime, partStartTime;
        for (let j = 0; j < arrayOfServices[i].trips.length; j++) {
          if (arrayOfServices[i].trips[j].shift == "P") {
            partEndTime = arrayOfServices[i].trips[j].endTime;
            if (arrayOfServices[i].trips[j + 1].servStart == undefined)
              partStartTime = arrayOfServices[i].trips[j + 1].startTime;
            else
              partStartTime = arrayOfServices[i].trips[j + 1].servStart;
            break;
          }
        }
        tempNewCell3.textContent = partEndTime;
        let partEndMinutes =
          parseInt(partEndTime.substring(0, partEndTime.indexOf(":"))) * 60 +
          parseInt(partEndTime.substring(partEndTime.indexOf(":") + 1));
        let partAMinutes = partEndMinutes - startMinutes;
        tempMin = partAMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(partAMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = (arrayOfServices[i].distA / 1000).toFixed(3);
        tempNewRow2 = brygStatsEl.insertRow(-1);
        tempNewCell1 = tempNewRow2.insertCell(-1);
        tempNewCell2 = tempNewRow2.insertCell(-1);
        tempNewCell3 = tempNewRow2.insertCell(-1);
        tempNewCell4 = tempNewRow2.insertCell(-1);
        tempNewCell5 = tempNewRow2.insertCell(-1);
        tempNewCell1.textContent = "B (BIS)";
        tempNewCell2.textContent = partStartTime;
        let endMinutes =
          parseInt(
            arrayOfServices[i].trips[
              arrayOfServices[i].trips.length - 1
            ].endTime.substring(
              0,
              arrayOfServices[i].trips[
                arrayOfServices[i].trips.length - 1
              ].endTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServices[i].trips[
              arrayOfServices[i].trips.length - 1
            ].endTime.substring(
              arrayOfServices[i].trips[
                arrayOfServices[i].trips.length - 1
              ].endTime.indexOf(":") + 1
            )
          );
        endMinutes += 4;
        if (endMinutes >= 1440) {
          endMinutes -= 1440;
        }
        tempMin = endMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(endMinutes / 60) + ":" + tempMin;
        tempNewCell3.textContent = newMinutesStr;
        let partStartMinutes =
          parseInt(partStartTime.substring(0, partStartTime.indexOf(":"))) *
          60 +
          parseInt(partStartTime.substring(partStartTime.indexOf(":") + 1));
        let partBMinutes;
        if (endMinutes > partStartMinutes) {
          partBMinutes = endMinutes - partStartMinutes;
        } else {
          partBMinutes = endMinutes - partStartMinutes + 1440;
        }
        tempMin = partBMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(partBMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = (arrayOfServices[i].distB / 1000).toFixed(3);
        tempNewRow2 = brygStatsEl.insertRow(-1);
        tempNewCell1 = tempNewRow2.insertCell(-1);
        tempNewCell1.setAttribute("colspan", "3");
        tempNewCell1.textContent = "Razem: ";
        tempNewCell2 = tempNewRow2.insertCell(-1);
        tempNewCell3 = tempNewRow2.insertCell(-1);
        let finalMinutes = partAMinutes + partBMinutes;
        tempMin = finalMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(finalMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        tempNewCell3.textContent = (arrayOfServices[i].totalDist / 1000).toFixed(3);
      } else if (arrayOfServices[i].serviceType == "2ZM") {
        brygTypeEl.textContent = "Brygada dwuzmianowa";
        let tempNewRow2 = brygStatsEl.insertRow(-1);
        let tempNewCell1 = tempNewRow2.insertCell(-1);
        let tempNewCell2 = tempNewRow2.insertCell(-1);
        let tempNewCell3 = tempNewRow2.insertCell(-1);
        let tempNewCell4 = tempNewRow2.insertCell(-1);
        let tempNewCell5 = tempNewRow2.insertCell(-1);
        tempNewCell1.textContent = "A";
        let startMinutes =
          parseInt(
            arrayOfServices[i].startTime.substring(
              0,
              arrayOfServices[i].startTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServices[i].startTime.substring(
              arrayOfServices[i].startTime.indexOf(":") + 1
            )
          );
        if ((arrayOfServices[i].dayType == '2' || arrayOfServices[i].dayType == '3') && parseInt(arrayOfServices[i].startTime.split(":")[0]) >= 7 && arrayOfServices[i].code[0] != "N") {
          startMinutes -= 10;
        } else if (arrayOfServices[i].trips[0].lineId != "10") {
          startMinutes -= 6;
        } else {
          startMinutes -= 4;
        }
        if (startMinutes < 0) {
          startMinutes += 1440;
        }
        let tempMin = startMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        let newMinutesStr = parseInt(startMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        arrayOfServices[i].getShiftTime();
        tempNewCell3.textContent = arrayOfServices[i].shiftTime;
        let partEndMinutes =
          parseInt(tempNewCell3.textContent.substring(0, tempNewCell3.textContent.indexOf(":"))) * 60 +
          parseInt(tempNewCell3.textContent.substring(tempNewCell3.textContent.indexOf(":") + 1));
        let partAMinutes = partEndMinutes - startMinutes;
        tempMin = partAMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(partAMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = (arrayOfServices[i].distA / 1000).toFixed(3);
        tempNewRow2 = brygStatsEl.insertRow(-1);
        tempNewCell1 = tempNewRow2.insertCell(-1);
        tempNewCell2 = tempNewRow2.insertCell(-1);
        tempNewCell3 = tempNewRow2.insertCell(-1);
        tempNewCell4 = tempNewRow2.insertCell(-1);
        tempNewCell5 = tempNewRow2.insertCell(-1);
        tempNewCell1.textContent = "B";
        tempNewCell2.textContent = arrayOfServices[i].shiftTime2;
        let endMinutes =
          parseInt(
            arrayOfServices[i].trips[
              arrayOfServices[i].trips.length - 1
            ].endTime.substring(
              0,
              arrayOfServices[i].trips[
                arrayOfServices[i].trips.length - 1
              ].endTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServices[i].trips[
              arrayOfServices[i].trips.length - 1
            ].endTime.substring(
              arrayOfServices[i].trips[
                arrayOfServices[i].trips.length - 1
              ].endTime.indexOf(":") + 1
            )
          );
        endMinutes += 4;
        if (endMinutes >= 1440) {
          endMinutes -= 1440;
        }
        tempMin = endMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(endMinutes / 60) + ":" + tempMin;
        tempNewCell3.textContent = newMinutesStr;
        let partStartMinutes =
          parseInt(tempNewCell2.textContent.substring(0, tempNewCell2.textContent.indexOf(":"))) *
          60 +
          parseInt(tempNewCell2.textContent.substring(tempNewCell2.textContent.indexOf(":") + 1));
        let partBMinutes;
        if (endMinutes > partStartMinutes) {
          partBMinutes = endMinutes - partStartMinutes;
        } else {
          partBMinutes = endMinutes - partStartMinutes + 1440;
        }
        tempMin = partBMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(partBMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = (arrayOfServices[i].distB / 1000).toFixed(3);
        tempNewRow2 = brygStatsEl.insertRow(-1);
        tempNewCell1 = tempNewRow2.insertCell(-1);
        tempNewCell1.setAttribute("colspan", "3");
        tempNewCell1.textContent = "Razem: ";
        tempNewCell2 = tempNewRow2.insertCell(-1);
        tempNewCell3 = tempNewRow2.insertCell(-1);
        let finalMinutes = partAMinutes + partBMinutes;
        tempMin = finalMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(finalMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        tempNewCell3.textContent = (arrayOfServices[i].totalDist / 1000).toFixed(3);
      }

      const koloryLinii = [
        {
          col: "#3498DB",
          line: null
        },
        {
          col: "#2ECC71",
          line: null
        },
        {
          col: "#A569BD",
          line: null
        },
        {
          col: "#F39C12",
          line: null
        },
        {
          col: "#C0392B",
          line: null
        },
        {
          col: "#F1C40F",
          line: null
        },
        {
          col: "#16A085",
          line: null
        }
      ]

      for (let j = 0; j < arrayOfServices[i].trips.length; j++) {
        let tempRoute;
        let tempNewRow = tbodyEl.insertRow(-1);
        let newCell1 = tempNewRow.insertCell(-1);
        let newCell2 = tempNewRow.insertCell(-1);
        let newCell3 = tempNewRow.insertCell(-1);
        let newCell4 = tempNewRow.insertCell(-1);
        let newCell5 = tempNewRow.insertCell(-1);
        let newCell6 = tempNewRow.insertCell(-1);
        let newCell7 = tempNewRow.insertCell(-1);
        newCell4.style.setProperty("font-weight", "bold");
        newCell1.innerHTML =
          "<a href='tripdet.php?id=" +
          arrayOfServices[i].id +
          "&id2=" +
          arrayOfServices[i].trips[j].id +
          "&ttid=" + ttid + "'>" +
          arrayOfServices[i].trips[j].order +
          ".</a>";
        for (let k = 0; k < arrayOfLines.length; k++) {
          if (arrayOfLines[k].id == arrayOfServices[i].trips[j].lineId) {
            newCell2.textContent = arrayOfLines[k].name;

            newCell2.classList.add("bold-txt");

            let colorLines = localStorage.getItem('colorLines');

            if (colorLines === null) {
              localStorage.setItem('colorLines', 'false');
              colorLines = 'false'; // Update isChecked variable
            }

            if (colorLines == 'true') {
              if (!["Doj", "Zj", "PTech", getLineById(arrayOfServices[i].mainLineId).name].includes(arrayOfLines[k].name)) {
                for (let l = 0; l < koloryLinii.length; l++) {
                  if (koloryLinii[l].line == null) {
                    koloryLinii[l].line = arrayOfLines[k].name;
                    newCell2.style.setProperty("background-color", koloryLinii[l].col);
                    break;
                  }
                  if (koloryLinii[l].line == arrayOfLines[k].name) {
                    newCell2.style.setProperty("background-color", koloryLinii[l].col);
                    break;
                  }
                }
              }
              if (["Doj", "Zj", "PTech"].includes(arrayOfLines[k].name)) {
                newCell2.style.setProperty("background-color", "#000000");
              }
            }

            break;
          }
        }
        for (let k = 0; k < arrayOfRoutes.length; k++) {
          if (arrayOfRoutes[k].id == arrayOfServices[i].trips[j].variantId) {
            tempRoute = arrayOfRoutes[k];
            newCell7.textContent = (tempRoute.distance / 1000).toFixed(3);
            if (tempRoute.direction != "PRZEJAZD TECHNICZNY") {
              newCell4.textContent = tempRoute.direction;
            } else {
              for (let l = 0; l < arrayOfStops2.length; l++) {
                if (
                  arrayOfStops2[l].id ==
                  tempRoute.stops[tempRoute.stops.length - 1]
                ) {
                  newCell4.textContent = arrayOfStops2[l].name;
                  break;
                }
              }
            }
            break;
          }
        }
        for (let k = 0; k < arrayOfStops2.length; k++) {
          if (arrayOfStops2[k].id == tempRoute.stops[0]) {
            newCell3.textContent = arrayOfStops2[k].name;
            break;
          }
        }
        newCell5.textContent = arrayOfServices[i].trips[j].startTime;
        newCell6.textContent = arrayOfServices[i].trips[j].endTime;
        if (arrayOfServices[i].trips[j].shift == "B") {
          if (arrayOfServices[i].trips[j].endShift == "B") {
            if (arrayOfServices[i].shiftTime != arrayOfServices[i].shiftTime2) {
              let breakRow = tbodyEl.insertRow(-1);
              let c1 = breakRow.insertCell(-1);
              let c2 = breakRow.insertCell(-1);
              let c3 = breakRow.insertCell(-1);
              c1.setAttribute("colspan", "2");
              c2.setAttribute("colspan", "2");
              c3.setAttribute("colspan", "3");
              c1.textContent = "Zak. A";
              const lastStop = getStopById(tempRoute.stops.at(-1));
              if (lastStop != "N/D")
                c2.textContent = lastStop.name;
              c3.textContent = arrayOfServices[i].shiftTime;
              breakRow.classList.add("shift-stop", "podmiana-info");
              breakRow = tbodyEl.insertRow(-1);
              c1 = breakRow.insertCell(-1);
              c2 = breakRow.insertCell(-1);
              c3 = breakRow.insertCell(-1);
              c1.setAttribute("colspan", "2");
              c2.setAttribute("colspan", "2");
              c3.setAttribute("colspan", "3");
              c1.textContent = "Rozp. B";
              const firstStop = getStopById(getRouteById(arrayOfServices[i].trips[j + 1].variantId).stops[0]);
              if (firstStop != "N/D")
                c2.textContent = lastStop.name;
              c3.textContent = arrayOfServices[i].shiftTime2;
              breakRow.classList.add("shift-stop", "podmiana-info");
            } else {
              let breakRow = tbodyEl.insertRow(-1);
              let c1 = breakRow.insertCell(-1);
              let c2 = breakRow.insertCell(-1);
              let c3 = breakRow.insertCell(-1);
              c1.setAttribute("colspan", "2");
              c2.setAttribute("colspan", "2");
              c3.setAttribute("colspan", "3");
              c1.textContent = "Podmiana";
              const lastStop = getStopById(tempRoute.stops.at(-1));
              if (lastStop != "N/D")
                c2.textContent = lastStop.name;
              c3.textContent = arrayOfServices[i].shiftTime;
              breakRow.classList.add("shift-stop", "podmiana-info");
            }
          } else {
            tempNewRow.classList.add("shift-stop");
            let breakRow = tbodyEl.insertRow(-1);
            let c1 = breakRow.insertCell(-1);
            let c2 = breakRow.insertCell(-1);
            let c3 = breakRow.insertCell(-1);
            c1.setAttribute("colspan", "2");
            c2.setAttribute("colspan", "2");
            c3.setAttribute("colspan", "3");
            c1.textContent = "Podmiana";
            const shiftStop = getStopById(tempRoute.stops[arrayOfServices[i].trips[j].t1len - 1]);
            if (shiftStop != "N/D")
              c2.textContent = shiftStop.name;
            c3.textContent = arrayOfServices[i].shiftTime;
            breakRow.classList.add("shift-stop", "podmiana-info");
          }
        }
        if (arrayOfServices[i].trips[j].shift == "P") {
          let breakRow = tbodyEl.insertRow(-1);
          let c1 = breakRow.insertCell(-1);
          let c2 = breakRow.insertCell(-1);
          let c3 = breakRow.insertCell(-1);
          let c4 = breakRow.insertCell(-1);
          c1.setAttribute("colspan", "4");
          c1.textContent = "Przerwa szczytowa";
          c2.textContent = arrayOfServices[i].trips[j].endTime;
          c3.textContent = arrayOfServices[i].trips[j + 1].startTime;
          const timeDiff = calculateTimeDifference(arrayOfServices[i].trips[j].endTime, arrayOfServices[i].trips[j + 1].startTime);
          c4.textContent = timeDiff.hours + ":";
          if (timeDiff.minutes < 10)
            c4.textContent += '0';
          c4.textContent += timeDiff.minutes;
          breakRow.classList.add("bis-shift", "podmiana-info");
        }
        arrayOfServices[i].rezerwy.forEach(rezerwa => {
          console.log(rezerwa);
          if (rezerwa.poKursie == arrayOfServices[i].trips[j].id) {
            let insertOffset = -1;
            if (arrayOfServices[i].trips[j].endTime == rezerwa.godzRozp && arrayOfServices[i].trips[j].shift == "P") {
              insertOffset = -2;
            }
            console.log(insertOffset);

            if (insertOffset === -2) {
              insertOffset = tbodyEl.rows.length - 1;
            }

            let rezRow = tbodyEl.insertRow(insertOffset);

            rezRow.classList.add("rezerwa-row");
            let c1 = rezRow.insertCell(-1);
            let c2 = rezRow.insertCell(-1);
            let c3 = rezRow.insertCell(-1);
            let c4 = rezRow.insertCell(-1);
            let c5 = rezRow.insertCell(-1);
            c1.setAttribute("colspan", "2");
            c2.setAttribute("colspan", "2");
            c1.textContent = "Rezerwa";
            c1.classList.add("bold-txt")
            c2.classList.add("bold-txt")
            const lastStop = getStopById(tempRoute.stops.at(-1));
            if (lastStop != "N/D")
              c2.textContent = lastStop.name;
            c3.textContent = rezerwa.godzRozp;
            c4.textContent = rezerwa.godzZak;
            const timeDiff = calculateTimeDifference(rezerwa.godzRozp, rezerwa.godzZak);
            c5.textContent = timeDiff.hours + ":" + String(timeDiff.minutes).padStart(2, "0");
          }
        })
      }
      getHistoryDataForService(arrayOfServices[i]);
      break;
    }
  }
}

function getLines(skip) {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBase + "lines.json?v=25-03-23v1",
    dataType: "json",
  }).done(function (data) {
    data.forEach((e) => {
      arrayOfLines.push(new Line(e.id, e.MarketingName));
    });
    arrayOfLines.sort(sortLines);
    skip = !!skip;
    if (!skip) {
      if (document.querySelector("#line-sel") != undefined)
        arrayOfLines.forEach(line => {
          const optEl = document.createElement("option");
          optEl.setAttribute("value", line.id);
          optEl.textContent = line.name;
          lineSel.append(optEl);
        })
      getRoutes();
    } else {
      arrayOfLines.forEach(line => {
        let tempFilterCkb = document.createElement("div");
        tempFilterCkb.innerHTML = "<input type='checkbox' name='fline-" + line.name + "' id='fline-" + line.name + "''><label for='fline-" + line.name + "'>" + line.name + "</label>";
        tempFilterCkb.querySelector("input").checked = true;
        fLinesEl.appendChild(tempFilterCkb);
      })
    }
  });
}
function getRoutes() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBase + "routesDist.json?v=25-03-23v1",
    dataType: "json"
  }).done(function (data) {
    data.forEach((e) => {
      arrayOfRoutes.push(
        new Route(e.id, e.LineRef, e.StopPointRef, e.DisplayDescription, e.Distance, e.DistanceValues, e.Description, e.Direction, e.Default)
      );
    });
    arrayOfServices.forEach(sv => {
      let dist = 0;
      sv.trips.forEach(trip => {
        let tempR = getRouteById(trip.variantId);
        if (trip.shift == "B") {
          let distPT = 0;
          for (let i = 0; i < trip.t1len - 1; i++) {
            distPT += tempR.distanceArray[i];
          }
          sv.distA = dist + distPT;
        }
        dist += tempR.distance;
        if (trip.shift == "P") {
          sv.distA = dist;
        }
      })
      sv.totalDist = dist;
      if (sv.distA != undefined)
        sv.distB = dist - sv.distA;
    })
    getStops();
  });
}
function getStops() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBase + "stops.json",
    dataType: "json",
  }).done(function (data) {
    data.forEach((e) => {
      arrayOfStops2.push(new Stop(e.id, e.CommonName));
    });
    if (typeof currSerId !== "undefined") {
      displayServiceDetails(currSerId, detTblBody);
    } else if (typeof currServId !== "undefined") {
      displayTripDetails(currServId, currTripId, detTblBody);
    } else if (typeof document.querySelector(".day-type") !== "undefined") {
      let ckbs = document.querySelectorAll(".day-type input");
      ckbs.forEach((ckb) => {
        if (ckb.checked) {
          displayServices(ckb.getAttribute("id").slice(-1), tblBody);
        }
      });
    }
    try {
      searchVehicleHistory();
    } catch (error) {
      //console.log(error);
    }
    try {
      dtSel.removeAttribute("disabled");
      updateSelTbl();
    } catch (error) {
      //console.log(error);
    }
  });
}
function displayTripDetails(sId, tId, tbodyEl) {
  let ctr = 1;
  let currTime, currH, currMin;
  for (let i = 0; i < arrayOfServices.length; i++) {
    if (arrayOfServices[i].id == sId) {
      servBaseInfoEl.textContent = arrayOfServices[i].code + " - ";
      brygTtBtn.setAttribute(
        "href",
        "brygdet.php?id=" + arrayOfServices[i].id + "&ttid=" + ttid
      );
      if (Array.isArray(arrayOfServices[i].dayType)) {
        servBaseInfoEl.textContent += "RS/RW";
      } else if (arrayOfServices[i].dayType == "4") {
        servBaseInfoEl.textContent += "RS";
      } else if (arrayOfServices[i].dayType == "1") {
        servBaseInfoEl.textContent += "RW";
      } else if (arrayOfServices[i].dayType == "2") {
        servBaseInfoEl.textContent += "SS";
      } else if (arrayOfServices[i].dayType == "3") {
        servBaseInfoEl.textContent += "NS";
      }
      for (let j = 0; j < arrayOfServices[i].trips.length; j++) {
        if (arrayOfServices[i].trips[j].id == tId) {
          document.title = "Rozkład kursu: " + arrayOfServices[i].code + "/" + arrayOfServices[i].trips[j].order;
          courseSeqEl.textContent =
            "Kurs nr: " + arrayOfServices[i].trips[j].order;
          let breakBefore = undefined;
          let breakAfter = undefined;
          if (j != 0) {
            prevBtn.setAttribute(
              "href",
              "tripdet.php?id=" +
              arrayOfServices[i].id +
              "&id2=" +
              arrayOfServices[i].trips[j - 1].id + "&ttid=" + ttid
            );
            const timeDiff = calculateTimeDifference(arrayOfServices[i].trips[j - 1].endTime, arrayOfServices[i].trips[j].startTime);
            breakBefore = timeDiff.hours + ":" + String(timeDiff.minutes).padStart(2, "0");
          } else {
            prevBtn.classList.add("btn-disabled");
            prevBtn.removeAttribute("href");
          }
          if (j < arrayOfServices[i].trips.length - 1) {
            nextBtn.setAttribute(
              "href",
              "tripdet.php?id=" +
              arrayOfServices[i].id +
              "&id2=" +
              arrayOfServices[i].trips[j + 1].id + "&ttid=" + ttid
            );
            const timeDiff = calculateTimeDifference(arrayOfServices[i].trips[j].endTime, arrayOfServices[i].trips[j + 1].startTime);
            breakAfter = timeDiff.hours + ":" + String(timeDiff.minutes).padStart(2, "0");
          } else {
            nextBtn.classList.add("btn-disabled");
            nextBtn.removeAttribute("href");
          }

          //todo: wyświetlenie breakBefore i breakAfter

          for (let k = 0; k < arrayOfLines.length; k++) {
            if (arrayOfLines[k].id == arrayOfServices[i].trips[j].lineId) {
              baseInfoEl.innerHTML = arrayOfLines[k].name + " ";
              break;
            }
          }
          currTime = arrayOfServices[i].trips[j].startTime;
          currH = currTime.substr(0, currTime.indexOf(":"));
          currMin = currTime.substr(currTime.indexOf(":") + 1);
          for (let k = 0; k < arrayOfRoutes.length; k++) {
            if (arrayOfRoutes[k].id == arrayOfServices[i].trips[j].variantId) {
              let tempRoute = arrayOfRoutes[k];
              tripLenEl.textContent = (tempRoute.distance / 1000).toFixed(3) + " km";
              for (let l = 0; l < arrayOfStops2.length; l++) {
                if (tempRoute.stops[0] == arrayOfStops2[l].id) {
                  baseInfoEl.innerHTML +=
                    arrayOfStops2[l].name +
                    '<i class="fa-solid fa-arrow-right"></i>';
                  break;
                }
              }
              if (tempRoute.direction != "PRZEJAZD TECHNICZNY") {
                baseInfoEl.innerHTML += tempRoute.direction;
              } else {
                for (let l = 0; l < arrayOfStops2.length; l++) {
                  if (
                    arrayOfStops2[l].id ==
                    tempRoute.stops[tempRoute.stops.length - 1]
                  ) {
                    baseInfoEl.innerHTML += arrayOfStops2[l].name;
                    break;
                  }
                }
              }
              let dist = 0, ctrDist = 0;
              tempRoute.stops.forEach((stop) => {
                for (let l = 0; l < arrayOfStops2.length; l++) {
                  if (stop == arrayOfStops2[l].id) {
                    let tempNewRow = tbodyEl.insertRow(-1);
                    let newCell1 = tempNewRow.insertCell(-1);
                    let newCell2 = tempNewRow.insertCell(-1);
                    let newCell3 = tempNewRow.insertCell(-1);
                    let newCell4 = tempNewRow.insertCell(-1);
                    newCell1.textContent = ctr + ".";
                    newCell2.textContent = arrayOfStops2[l].name;
                    newCell3.textContent = currH + ":" + currMin;
                    newCell4.textContent = (dist / 1000).toFixed(3);
                    dist += tempRoute.distanceArray[ctrDist];
                    ctrDist++;
                    if (
                      (ctr == arrayOfServices[i].trips[j].t1len &&
                        arrayOfServices[i].trips[j].endShift != "B") ||
                      ((ctr - 1 == arrayOfServices[i].trips[j].t1len ||
                        (ctr == 2 &&
                          !Array.isArray(arrayOfServices[i].trips[j].times))) &&
                        arrayOfServices[i].trips[j].endShift == "B")
                    ) {
                      tempNewRow.classList.add("shift-stop");
                    }
                    if (arrayOfServices[i].trips[j].shift == "P" && ctr == tempRoute.stops.length)
                      tempNewRow.classList.add("bis-shift");
                    if (Array.isArray(arrayOfServices[i].trips[j].times)) {
                      currMin =
                        parseInt(currMin) +
                        parseInt(arrayOfServices[i].trips[j].times[ctr - 1]);
                      if (currMin >= 60) {
                        let tempv = parseInt(currMin / 60);
                        currMin = currMin % 60;
                        currH = (parseInt(currH) + tempv) % 24;
                      }
                    } else {
                      currMin =
                        parseInt(currMin) +
                        parseInt(arrayOfServices[i].trips[j].times);
                      if (currMin >= 60) {
                        let tempv = parseInt(currMin / 60);
                        currMin = currMin % 60;
                        currH = (parseInt(currH) + tempv) % 24;
                      }
                    }
                    if (currMin.toString().length == 1) {
                      currMin = "0" + currMin;
                    }
                    ctr++;
                    break;
                  }
                }
              });

              break;
            }
          }

          break;
        }
      }
      break;
    }
  }
}
function getVehicleList() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBase + "vehicles.json?v=25-03-23v1",
    dataType: "json",
  }).done(function (data) {
    vehicleList = data;
    refreshVehArray();
  })
}

function refreshVehArray() {
  if (arrayOfServices.length == 0)
    getAllServices();
  let firstRun = true;
  setInterval(function () {
    if (currentRefreshCounter == 0 || firstRun) {
      currentRefreshCounter = 10;
      getVehicles(true);
      if (arrayOfVehicles.length == 0) {
        currentRefreshCounter = 1;
      }
      firstRun = false;
      displayVehTbl(selectSort.value);
      displayVehiclesOnMap(true);
    } else {
      currentRefreshCounter--;
    }
    refCounterEl.textContent = currentRefreshCounter;
  }, 1000);
}

function displayVehTbl(orderBy) {
  vehTblEl.innerHTML = "";
  arrayOfVehicles.forEach(veh => {
    for (let i = 0; i < vehicleList.length; i++) {
      if (vehicleList[i].id == veh.id.trim()) {
        veh.model = vehicleList[i].model;
        break;
      }
    }
    veh.service = getServiceFromVehicle(veh, new Date());
  })
  switch (orderBy) {
    case "id":
      arrayOfVehicles.sort((a, b) => a.id - b.id);
      break;
    case "idD":
      arrayOfVehicles.sort((a, b) => b.id - a.id);
      break;
    case "line":
      arrayOfVehicles.sort((a, b) => a.id - b.id);
      arrayOfVehicles.sort(sortLines);
      break;
    case "lineD":
      arrayOfVehicles.sort((a, b) => a.id - b.id);
      arrayOfVehicles.sort(sortLines);
      arrayOfVehicles.reverse();
      break;
    case "service":
      arrayOfVehicles.sort(sortServices);
      break;
    case "serviceD":
      arrayOfVehicles.sort(sortServices);
      arrayOfVehicles.reverse();
      break;
    case "delay":
      arrayOfVehicles.sort((a, b) => b.odchylenie - a.odchylenie)
      break;
    case "delayD":
      arrayOfVehicles.sort((a, b) => a.odchylenie - b.odchylenie)
      break;
  }
  arrayOfVehicles.forEach(veh => {
    let newRow = vehTblEl.insertRow(-1);
    let newCell1 = newRow.insertCell(-1);
    let newCell2 = newRow.insertCell(-1);
    let newCell3 = newRow.insertCell(-1);
    let newCell4 = newRow.insertCell(-1);
    let newCell5 = newRow.insertCell(-1);
    let newCell6 = newRow.insertCell(-1);

    newCell1.innerHTML = "<a href='vehiclehistory.php?id=" + veh.id + "'>" + veh.id + "</a>";
    newCell2.textContent = veh.model;
    if (veh.nrLinii == "") {
      newCell3.innerHTML = "<a class='" + veh.nastNrLinii + "'>" + veh.nastNrLinii + "</a>";
      newCell4.textContent = veh.nastKierTekst;
    } else {
      newCell3.innerHTML = "<a class='" + veh.nrLinii + "'>" + veh.nrLinii + "</a>"
      newCell4.textContent = veh.kierTekst;
    }
    newCell3.querySelector("a").addEventListener("click", () => {
      selectedLine = event.target.getAttribute("class");
      if (!mapOpen) {
        document.querySelector("main").classList.add("mapon");
        mapOpen = true;
      }
      displayVehiclesOnMap(true);
    })
    if (veh.service != null) {
      newCell5.innerHTML = "<a href='brygdet.php?id=" + veh.service.id + "&ttid=" + ttid + "'>" + veh.service.code + "</a>";
    } else {
      newCell5.textContent = "---";
    }
    let tempOdch = veh.odchylenie;
    let tempOdchStr = "";
    if (tempOdch == 0) {
      tempOdchStr = "0:00";
    } else {
      if (tempOdch > 0) tempOdchStr = "+";
      else tempOdchStr = "-";
      tempOdchStr += parseInt(Math.abs(tempOdch / 60)) + ":";
      if (Math.abs(tempOdch % 60) < 10) {
        tempOdchStr += "0";
      }
      tempOdchStr += Math.abs(tempOdch % 60);
    }
    newCell6.textContent = tempOdchStr;
    if (veh.stan == "2") newCell6.style.setProperty("background-color", "#198517");
    if (["3", "6", "7", "10"].indexOf(veh.stan) > -1) newCell6.style.setProperty("background-color", "#173e85");
  })
}

function updatePKSVehicles() {
  const socket = new WebSocket("ws://89.174.170.112:3000/rist");
  socket.addEventListener("message", (event) => {
    let tempData = JSON.parse(event.data);
    let tempVehicle = new VehiclePKS(tempData);
    if (!tempVehicle.hasOwnProperty("cords")) return;
    if (tempVehicle.cords[0] == null || isNaN(tempVehicle.cords[0])) return;
    let existing = false;
    for (let i = 0; i < arrayOfVehiclesPKS.length; i++) {
      if (arrayOfVehiclesPKS[i].id == tempVehicle.id) {
        existing = true;
        let vehDate2 = new Date(tempVehicle.pos_date);
        vehDate2.setDate(vehDate2.getDate() + 1);
        tempVehicle.pos_date2 = vehDate2;
        arrayOfVehiclesPKS[i] = tempVehicle;
        break;
      }
    }
    if (!existing) {
      arrayOfVehiclesPKS.push(tempVehicle);
    }
  })
}

function displayPKSVehicles() {
  if (!currInfoFilters.mks) {
    return;
  }
  arrayOfVehiclesPKS.forEach(tempVehicle => {
    const markerPos = {
      lat: parseFloat(tempVehicle.cords[0]),
      lng: parseFloat(tempVehicle.cords[1]),
    };
    let compDate = new Date();
    let vehDate = new Date(tempVehicle.pos_date);
    let vehDate2 = new Date(tempVehicle.pos_date2);
    let cond1 = (compDate - vehDate) / 1000 <= 120;
    let cond2 = ((compDate - vehDate2) / 1000 <= 120 && (compDate - vehDate2) / 1000 >= 0);
    if (cond1 || cond2) {
      const vehData = document.createElement("div");
      vehData.classList.add("veh-data", "pks-marker");
      let vehTempHTML =
        '<div class="veh-data-row">';
      if (currInfoFilters.line) {
        vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-l"></i><span>' +
          tempVehicle.line +
          '</span></div>';
      }
      if (currInfoFilters.tab) {
        vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-bus-simple"></i><span id="nb">' +
          tempVehicle.id +
          '</span></div>';
      }
      vehTempHTML += '</div><div class="veh-data-row">'
      if (currInfoFilters.dir) {
        vehTempHTML += '<div class="veh-data-el"><i class="fa-solid fa-k"></i><span>' +
          tempVehicle.destination +
          "</span></div>";
      }
      vehTempHTML += '</div>';
      if (currInfoFilters.bryg) {
        vehTempHTML += '<div class="veh-data-row"><div class="veh-data-el"><i class="fa-solid fa-b"></i><span id="vbryg">' + tempVehicle.service + '</span></div></div>';
      }
      if (currInfoFilters.delay) {
        let odchylenie = 0;
        let sek = "";
        let timeCl = "";
        let min = Math.abs(parseInt(tempVehicle.delay / 60));
        if (cond2) {
          min -= 1440;
        }
        if (Math.abs(tempVehicle.delay % 60) < 10) {
          sek = "0" + parseInt(Math.abs(tempVehicle.delay % 60));
        } else {
          sek = parseInt(Math.abs(tempVehicle.delay % 60));
        }
        if (Math.sign(tempVehicle.delay) == "1") {
          odchylenie = "+" + min + ":" + sek;
          timeCl = "time-gr";
        } else if (Math.sign(tempVehicle.delay) == "-1") {
          odchylenie = "-" + min + ":" + sek;
          timeCl = "time-rd";
        } else {
          odchylenie = min + ":" + sek;
          timeCl = "time-wh";
        }
        vehTempHTML +=
          '<div class="veh-data-el"><i class="fa-solid fa-clock ' +
          timeCl +
          '"></i><span>' +
          odchylenie +
          "</span></div>";
      }
      vehData.innerHTML = vehTempHTML;
      if (markerPos.lat != null && tempVehicle.hasOwnProperty("line")) {
        var marker = new google.maps.marker.AdvancedMarkerView({
          position: markerPos,
          map: map,
          content: vehData,
        });
        markersPKS.push(marker);
      }
    }
  })
}

function sortLines(a, b) {
  if (typeof a.name === "undefined") {
    if (a.nrLinii == "") {
      a.name = a.nastNrLinii;
      b.name = b.nastNrLinii;
    } else {
      a.name = a.nrLinii;
      b.name = b.nrLinii;
    }
  }
  const linesOrder = ["A", "B", "C", "D", "F", "G", "H", "G", "K", "M", "S", "G2A", "N1", "N2", "N3", "Doj", "PTech", "Zj"];
  if (a.name === "0A") {
    return -1;
  } else if (b.name === "0A") {
    return 1;
  } else if (a.name === "0B") {
    return -1;
  } else if (b.name === "0B") {
    return 1;
  }

  // Convert names to integers for numerical comparison
  const numA = parseInt(a.name);
  const numB = parseInt(b.name);

  // Check if both are numbers
  if (!isNaN(numA) && !isNaN(numB)) {
    if (numA < numB) {
      return -1;
    } else if (numA > numB) {
      return 1;
    }
  } else if (!isNaN(numA) && isNaN(numB)) {
    return -1;
  } else if (isNaN(numA) && !isNaN(numB)) {
    return 1;
  } else {
    // Compare based on linesOrder array
    const indexA = linesOrder.indexOf(a.name);
    const indexB = linesOrder.indexOf(b.name);

    if (indexA === -1 && indexB === -1) {
      // If both are not in linesOrder, compare their names directly
      return a.name.localeCompare(b.name);
    } else if (indexA === -1) {
      // If only a is not in linesOrder, it should come after b
      return 1;
    } else if (indexB === -1) {
      // If only b is not in linesOrder, it should come before a
      return -1;
    } else {
      // Compare based on their positions in linesOrder
      if (indexA < indexB) {
        return -1;
      } else if (indexA > indexB) {
        return 1;
      }
    }
  }
  return 0; // a and b are equal
}

function toggleRespMenu() {
  document.querySelector(".menu-opt").classList.toggle("responsive");
}

const respIcon = document.querySelector("#resp-icon");
if (respIcon != null) {
  respIcon.addEventListener("click", toggleRespMenu);
}

function getServiceFromVehicle(vehOb, newdate) {
  let currDayType = getDayType(newdate);
  let linia;
  let petla = false;
  if (vehOb.nrLinii != "") {
    linia = vehOb.nrLinii;
  } else if (vehOb.nastNrLinii != "") {
    linia = vehOb.nastNrLinii;
    petla = true;
  } else {
    linia = "00";
  }
  if (linia == "Doj" || linia == "Zj" || linia == "PTech")
    return;
  if ((linia[0] == "N" && newdate.getHours() >= 0 && newdate.getHours() <= 6) || (newdate.getHours() >= 0 && newdate.getHours() <= 1))
    currDayType = currDayType.dayTypeYest;
  else
    currDayType = currDayType.dayType;
  for (let i = 0; i < arrayOfServices.length; i++) {
    let containsLine = false;
    for (let j = 0; j < arrayOfServices[i].lines.length; j++) {
      if (arrayOfServices[i].lines[j].LineName == linia) {
        containsLine = true;
        break;
      }
    }
    if (!containsLine)
      continue;
    if (Array.isArray(arrayOfServices[i].dayType)) {
      if (!arrayOfServices[i].dayType.includes(currDayType))
        continue;
    } else if (arrayOfServices[i].dayType != currDayType)
      continue;
    if (petla) {
      for (let j = 0; j < arrayOfServices[i].trips.length; j++) {
        if (linia != getLineById(arrayOfServices[i].trips[j].lineId).name)
          continue;
        let departDate = new Date(newdate);
        departDate.setSeconds(departDate.getSeconds() + parseInt(vehOb.odjazdZa))
        let tempTime = arrayOfServices[i].trips[j].startTime.split(":");
        let tempTime2, rozklStart2 = new Date(departDate);
        let rozklStart = new Date(departDate);
        rozklStart.setHours(tempTime[0]);
        rozklStart.setMinutes(tempTime[1]);
        rozklStart.setSeconds(0);
        let cond2;
        if (arrayOfServices[i].trips[j].startTime2 != null) {
          tempTime2 = arrayOfServices[i].trips[j].startTime2.split(":");
          rozklStart2.setHours(tempTime2[0]);
          rozklStart2.setMinutes(tempTime2[1]);
          rozklStart2.setSeconds(0);
          cond2 = ((departDate - rozklStart2) / 1000 < 60 && (departDate - rozklStart2) / 1000 > -60);
        } else {
          cond2 = false;
        }
        if (((departDate - rozklStart) / 1000 < 60 && (departDate - rozklStart) / 1000 > -60) || cond2) {
          if (getRouteById(arrayOfServices[i].trips[j].variantId) == undefined)
            continue;
          let dir = getRouteById(arrayOfServices[i].trips[j].variantId).direction.trim();
          //testing line
          /*if(vehOb.id == "826"){
            console.log(dir + " - " + vehOb.nastKierTekst);
          }*/
          if (dir == vehOb.nastKierTekst)
            return arrayOfServices[i];
          else {
            for (let k = 0; k < directionReplacements.length; k++) {
              if (directionReplacements[k].oldName == dir) {
                dir = directionReplacements[k].newName;
                if (dir == vehOb.kierTekst)
                  return arrayOfServices[i];
              }
            }
          }
        }
      }
    } else {
      for (let j = 0; j < arrayOfServices[i].trips.length; j++) {
        if (linia != getLineById(arrayOfServices[i].trips[j].lineId).name)
          continue;
        if ((arrayOfServices[i].trips[j].startTime == vehOb.planRozp) || ('0' + arrayOfServices[i].trips[j].startTime == vehOb.planRozp) || (arrayOfServices[i].trips[j].startTime2 == vehOb.planRozp) || ('0' + arrayOfServices[i].trips[j].startTime2 == vehOb.planRozp)) {
          if (getRouteById(arrayOfServices[i].trips[j].variantId) == undefined)
            return;
          let dir = getRouteById(arrayOfServices[i].trips[j].variantId).direction.trim();
          //testing line
          /*if(vehOb.id == "819"){
            console.log(dir + " - " + vehOb.kierTekst);
          }*/
          if (dir == vehOb.kierTekst)
            return arrayOfServices[i];
          else {
            for (let k = 0; k < directionReplacements.length; k++) {
              if (directionReplacements[k].oldName == dir) {
                if (directionReplacements[k].newName == vehOb.kierTekst)
                  return arrayOfServices[i];
              }
            }
          }
        }
      }
    }
  }

}

function getRouteById(routeId) {
  for (let i = 0; i < arrayOfRoutes.length; i++) {
    if (arrayOfRoutes[i].id == routeId)
      return arrayOfRoutes[i];
  }
}

function getDayType(dateOb) {
  if (calendarArray.length == 0) {
    getCalendar();
  }
  let tzoffset = dateOb.getTimezoneOffset() * 60000;
  dateOb = new Date(dateOb.getTime() - tzoffset);
  let selDate = dateOb.toISOString().split('T')[0];
  for (let i = 0; i < calendarArray.length; i++) {
    if (selDate == calendarArray[i].Date) {
      let dtype = { dayType: calendarArray[i].DayTypeRef };
      if (i > 0) {
        dtype.dayTypeYest = calendarArray[i - 1].DayTypeRef;
      } else {
        dtype.dayTypeYest = 0;
      }
      return dtype;
    }
  }
  return { dayType: 0, dayTypeYest: 0 };
}

function getCalendar() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBase + "calendar.json",
    dataType: "json",
    async: false
  }).done(function (data) {
    calendarArray = data;
  });
}

function getAllServicesForVehicles(dateOb) {
  arrayOfVehicles.forEach(vehicle => {
    vehicle.serviceOb = getServiceFromVehicle(vehicle, dateOb);
  })
}

function getStopByName(stopName) {
  for (let i = 0; i < arrayOfStops2.length; i++) {
    if (arrayOfStops2[i].name == stopName) {
      return arrayOfStops2[i];
    }
  }
}

function getAllSchedules(stopId, stopName) {
  getStopScheduleData(stopId);
  getStaticSchedules(stopName);
}

function sortStaticSchedule(a, b) {
  if (a.stoppingTime < b.stoppingTime)
    return -1;
  else if (a.stoppingTime > b.stoppingTime)
    return 1;
  else if (a.line < b.line)
    return -1;
  else
    return 1;
}

function getStaticSchedules(stopName) {
  let staticStopOb = (getStopByName(stopName));
  let arrayOfStoppingRoutes = [];
  for (let i = 0; i < arrayOfRoutes.length; i++) {
    for (let j = 0; j < arrayOfRoutes[i].stops.length - 1; j++) {
      if (arrayOfRoutes[i].stops[j] == staticStopOb.id) {
        arrayOfStoppingRoutes.push(arrayOfRoutes[i]);
        break;
      }
    }
  }
  var staticDepData = [];
  arrayOfServices.forEach(service => {
    service.trips.forEach(trip => {
      for (let i = 0; i < arrayOfStoppingRoutes.length; i++) {
        if (arrayOfStoppingRoutes[i].id == trip.variantId) {
          let tempOb = {
            serviceId: service.id,
            tripId: trip.id,
            line: arrayOfStoppingRoutes[i].line,
            direction: arrayOfStoppingRoutes[i].direction,
            dayType: service.dayType
          }
          let tripTempTime = trip.startTime;
          tripTempTime = parseInt(tripTempTime.split(":")[0]) * 60 + parseInt(tripTempTime.split(":")[1]);
          for (let j = 0; j < arrayOfStoppingRoutes[i].stops.length; j++) {
            if (arrayOfStoppingRoutes[i].stops[j] == staticStopOb.id)
              break;
            else
              tripTempTime += parseInt(trip.times[j]);
          }
          tempOb.stoppingTime = tripTempTime;
          staticDepData.push(tempOb);
        }
      }
    })
  })
  staticDepData.sort(sortStaticSchedule);
  staticTblBody.innerHTML = "";
  let selDayType = "0";
  dayTypeRadio.forEach(ckb => {
    if (ckb.checked) {
      selDayType = ckb.getAttribute("id").slice(-1);
    }
  })
  for (let i = 0; i < staticDepData.length; i++) {
    if (Array.isArray(staticDepData[i].dayType)) {
      if (!staticDepData[i].dayType.includes(selDayType))
        continue;
    } else {
      if (staticDepData[i].dayType != selDayType)
        continue;
    }
    let tempNewRow = staticTblBody.insertRow(-1);
    let tempNewCell1 = tempNewRow.insertCell(-1);
    let tempNewCell2 = tempNewRow.insertCell(-1);
    let tempNewCell3 = tempNewRow.insertCell(-1);

    tempNewCell1.textContent = staticDepData[i].line;
    tempNewCell2.textContent = staticDepData[i].direction;
    let tempMin = staticDepData[i].stoppingTime % 60 + "";
    if (tempMin.length < 2)
      tempMin = '0' + tempMin;
    let depStr = parseInt(staticDepData[i].stoppingTime / 60) + ":" + tempMin;
    tempNewCell3.textContent = depStr;
  }
}

function getLineById(lineId) {
  for (let i = 0; i < arrayOfLines.length; i++) {
    if (arrayOfLines[i].id == lineId)
      return arrayOfLines[i];
  }
  return "N/D";
}

function getStopById(stopId) {
  for (let i = 0; i < arrayOfStops2.length; i++) {
    if (arrayOfStops2[i].id == stopId)
      return arrayOfStops2[i];
  }
  return "N/D";
}

function getHistoryData(startDate, endDate) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "php/getHistory.php?sd=" + startDate + "&ed=" + endDate,
      dataType: "json"
    }).done(function (data) {
      arrayVehHistory = [];
      let arrayToUpdate = [];
      let anyfind = false;
      data.forEach(histVeh => {
        let tempObj = {
          vehicle: new Vehicle(histVeh, true),
          date: new Date(histVeh.datetime),
          idh: histVeh.idh
        }
        if (tempObj.vehicle.serviceId == null) {
          let foundService = getServiceFromVehicle(tempObj.vehicle, tempObj.date);
          if (foundService != null) {
            anyfind = true;
            tempObj.vehicle.serviceId = foundService.id;
            tempObj.vehicle.serviceCode = foundService.code;
            if (Array.isArray(foundService.dayType)) {
              tempObj.vehicle.dayType = "14";
            } else {
              tempObj.vehicle.dayType = foundService.dayType;
            }
          } else {
            tempObj.vehicle.serviceId = 0;
            tempObj.vehicle.serviceCode = "N/D";
            tempObj.vehicle.dayType = "0";
          }
          arrayToUpdate.push(tempObj);
        }
        arrayVehHistory.push(tempObj);
      });
      if ((isCurrentTT && arrayOfServices.length == totalServ) || (ttid == "24-06-24" && arrayOfServices.length == 349 && startDate >= "2024-06-24" && startDate <= "2024-06-30") && anyfind) {
        $.ajax({
          url: "php/updateServices.php",
          type: "POST",
          data: JSON.stringify(arrayToUpdate)
        }).done((resp) => {
          console.log(resp);
          resolve(arrayVehHistory); // Resolve the promise with historical data
        }).fail((jqXHR, textStatus, errorThrown) => {
          reject(errorThrown); // Reject the promise if there is an error
        });
      } else {
        resolve(arrayVehHistory); // Resolve the promise with historical data
      }
    }).fail((jqXHR, textStatus, errorThrown) => {
      reject(errorThrown); // Reject the promise if there is an error
    });
  });
}

function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatTimeHMM(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes}`;
}

function getHistoryDataForService(service) {
  let dt;
  if (Array.isArray(service.dayType)) {
    dt = "14";
  } else {
    dt = service.dayType;
  }
  $.ajax({
    type: "GET",
    url: "php/getHistoryForService.php?sc=" + service.code + "&dt=" + dt,
    dataType: "json"
  }).done(function (data) {
    arrayVehHistory = [];
    let arrayToUpdate = [];
    let anyfind = false;
    data.forEach(histVeh => {
      let tempObj = {
        vehicle: new Vehicle(histVeh, true),
        date: new Date(histVeh.datetime),
        idh: histVeh.idh
      }
      if (tempObj.vehicle.serviceId == null) {
        let foundService = getServiceFromVehicle(tempObj.vehicle, tempObj.date);
        if (foundService != null) {
          anyfind = true;
          tempObj.vehicle.serviceId = foundService.id;
          tempObj.vehicle.serviceCode = foundService.code;
          if (Array.isArray(foundService.dayType)) {
            tempObj.vehicle.dayType = "14";
          } else {
            tempObj.vehicle.dayType = foundService.dayType;
          }
        } else {
          tempObj.vehicle.serviceId = 0;
          tempObj.vehicle.serviceCode = "N/D";
          tempObj.vehicle.dayType = "0";
        }
        arrayToUpdate.push(tempObj);
      }
      if (tempObj.vehicle.serviceCode == service.code && tempObj.vehicle.dayType == dt) {
        arrayVehHistory.push(tempObj);
      }
    })
    if (isCurrentTT && arrayOfServices.length == totalServ && anyfind) {
      $.ajax({
        url: "php/updateServices.php",
        type: "POST",
        data: JSON.stringify(arrayToUpdate)
      }).done((resp) => {
        console.log(resp);
      });
    }
    let dayEnd;
    if (service.code[0] != "N") {
      dayEnd = new Date("2000-01-02T02:00:00");
    } else {
      dayEnd = new Date("2000-01-02T15:00:00");
    }
    let arrayOfDays = [];
    let tempArr = [];
    let currDay;
    for (let j = 0; j < arrayVehHistory.length; j++) {
      if (j == 0) {
        tempArr.push(arrayVehHistory[j]);
        currDay = arrayVehHistory[j].date.toISOString().split('T')[0];
        continue;
      }
      if (arrayVehHistory[j].date.toISOString().split('T')[0] == currDay) {
        tempArr.push(arrayVehHistory[j]);
        continue;
      }
      if (isNextOrSameDay(arrayVehHistory[j - 1].date, arrayVehHistory[j].date)) {
        if (arrayVehHistory[j].date.getHours() <= dayEnd.getHours()) {
          tempArr.push(arrayVehHistory[j]);
          continue;
        }
      }
      arrayOfDays.push({
        day: currDay,
        loggedVehicles: tempArr
      })
      tempArr = [arrayVehHistory[j]];
      currDay = arrayVehHistory[j].date.toISOString().split('T')[0];
    }
    arrayOfDays.push({
      day: currDay,
      loggedVehicles: tempArr
    })
    arrayOfDays.reverse();
    arrayOfDays.forEach(day => {
      let newRow = histTblEl.insertRow(-1);
      let newCell1 = newRow.insertCell(-1);
      let newCell2 = newRow.insertCell(-1);
      newCell1.innerHTML = "<a href='history.php?date=" + day.day + "'>" + day.day + "</a>"
      for (let j = 0; j < day.loggedVehicles.length; j++) {
        if (j == 0) {
          newCell2.innerHTML += "<a href='vehiclehistory.php?id=" + day.loggedVehicles[j].vehicle.id + "'>" + day.loggedVehicles[j].vehicle.id + "</a> [" + formatTimeHMM(day.loggedVehicles[j].date) + " - ";
          continue;
        }
        if (day.loggedVehicles[j - 1].vehicle.id == day.loggedVehicles[j].vehicle.id)
          continue;
        else {
          newCell2.innerHTML += formatTimeHMM(day.loggedVehicles[j - 1].date) + "], <a href='vehiclehistory.php?id=" + day.loggedVehicles[j].vehicle.id + "'>" + day.loggedVehicles[j].vehicle.id + "</a> [" + formatTimeHMM(day.loggedVehicles[j].date) + " - ";
        }
      }
      newCell2.innerHTML += formatTimeHMM(day.loggedVehicles.at(-1).date) + "]";
    })
  });
}

function getHistoryForVehicle(vehId) {
  $.ajax({
    type: "GET",
    url: "php/getHistoryForVehicle.php?id=" + vehId,
    dataType: "json",
    async: false
  }).done(function (data) {
    arrayVehHistory = [];
    let arrayToUpdate = [];
    let anyfind = false;
    data.forEach(histVeh => {
      let tempObj = {
        vehicle: new Vehicle(histVeh, true),
        date: new Date(histVeh.datetime),
        idh: histVeh.idh
      }
      if (tempObj.vehicle.serviceId == null) {
        let foundService = getServiceFromVehicle(tempObj.vehicle, tempObj.date);
        if (foundService != null) {
          anyfind = true;
          tempObj.vehicle.serviceId = foundService.id;
          tempObj.vehicle.serviceCode = foundService.code;
          if (Array.isArray(foundService.dayType)) {
            tempObj.vehicle.dayType = "14";
          } else {
            tempObj.vehicle.dayType = foundService.dayType;
          }
        } else {
          tempObj.vehicle.serviceId = 0;
          tempObj.vehicle.serviceCode = "N/D";
          tempObj.vehicle.dayType = "0";
        }
        arrayToUpdate.push(tempObj);
      }
      arrayVehHistory.push(tempObj);
    })
    if (isCurrentTT && arrayOfServices.length == totalServ && anyfind) {
      $.ajax({
        url: "php/updateServices.php",
        type: "POST",
        data: JSON.stringify(arrayToUpdate)
      }).done((resp) => {
        console.log(resp);
      });
    }
  });
}

function isNextOrSameDay(firstDate, secondDate) {
  // Extract day, month, and year components from the dates
  const firstDay = firstDate.getDate();
  const firstMonth = firstDate.getMonth();
  const firstYear = firstDate.getFullYear();

  const secondDay = secondDate.getDate();
  const secondMonth = secondDate.getMonth();
  const secondYear = secondDate.getFullYear();

  // Check if the second date is the next day
  if (
    secondYear === firstYear &&
    secondMonth === firstMonth &&
    (secondDay === firstDay + 1 || secondDay === firstDay)
  ) {
    return true;
  }

  return false;
}

function calculateTimeDifference(time1, time2) {
  // Parse the input time strings
  const [hours1, minutes1] = time1.split(':').map(Number);
  let [hours2, minutes2] = time2.split(':').map(Number);

  if (hours2 < hours1)
    hours2 += 24;

  // Calculate the time difference in minutes
  let timeDifferenceInMinutes = (hours2 - hours1) * 60 + (minutes2 - minutes1);

  // Ensure the result is positive
  timeDifferenceInMinutes = Math.abs(timeDifferenceInMinutes);

  // Calculate hours and remaining minutes
  const hours = Math.floor(timeDifferenceInMinutes / 60);
  const minutes = timeDifferenceInMinutes % 60;

  // Return the result as an object
  return { hours, minutes };
}

function hasRouteAnyTrip(routeId) {
  if (routeOccurences.length == 0) {
    arrayOfServices.forEach(sv => {
      sv.trips.forEach(trip => {
        if (routeOccurences.indexOf(trip.variantId) == -1)
          routeOccurences.push(trip.variantId);
      })
    })
  }
  if (routeOccurences.indexOf(routeId) > -1) return true;
  else return false;
}

function hasDayTypeLine(lineId, dayType) {
  if (lineOccurences[dayType].length == 0) {
    arrayOfServices.forEach(sv => {
      if (sv.operatesOnDayType(dayType))
        sv.trips.forEach(trip => {
          if (lineOccurences[dayType].indexOf(trip.lineId) == -1)
            lineOccurences[dayType].push(trip.lineId);
        })
    })
  }
  if (lineOccurences[dayType].indexOf(lineId) > -1) return true;
  else return false;
}

function getPKSServices() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBasePKS + "services.json",
    dataType: "json"
  }).done(function (data) {
    data.forEach((e) => {
      let tempService = new ServicePKS(e);
      arrayOfServicesPKS.push(tempService);
    });
    arrayOfServicesPKS.sort(sortServicesPKS);
    getPKSTrips();
  });
}

function getPKSTrips() {
  $.ajax({
    type: "GET",
    url: "script/json/" + urlBasePKS + "trips.json?v=25-03-23v1",
    dataType: "json"
  }).done(function (trips) {
    $.ajax({
      type: "GET",
      url: "script/json/" + urlBasePKS + "tripDetails.json?v=25-03-23v1",
      dataType: "json"
    }).done(function (tripDets) {
      trips.forEach(trip => {
        for (let i = 0; i < tripDets.length; i++) {
          if (tripDets[i].ID == trip.ID) {
            trip.Stops = tripDets[i].Stops;
            trip.Ozn = tripDets[i].ozn;
            trip.startTime = tripDets[i].Stops[0].Time;
            trip.endTime = tripDets[i].Stops.at(-1).Time;
            trip.dist = tripDets[i].Stops.at(-1).Dist - tripDets[i].Stops.at(0).Dist;
            trip.Od = tripDets[i].Stops[0].Name;
            trip.Do = tripDets[i].Stops.at(-1).Name;
            break;
          }
        }
        for (let i = 0; i < arrayOfServicesPKS.length; i++) {
          if (arrayOfServicesPKS[i].acceptedVal.includes(trip.Brygada) && arrayOfServicesPKS[i].dayType == trip.TypDnia) {
            arrayOfServicesPKS[i].trips.push(trip);
            if (!arrayOfServicesPKS[i].hasLine(trip.Linia))
              arrayOfServicesPKS[i].lines.push(trip.Linia);
          }
        }
      })
      arrayOfServicesPKS.forEach(sv => {
        if(sv.trips.length > 0){
          sv.startTime = sv.trips[0].startTime;
          sv.endTime = sv.trips.at(-1).endTime;
          sv.dist = 0;
          sv.trips.forEach(trip => {
            sv.dist += parseFloat(trip.dist);
          })
          sv.checkServiceType();
        }
      })
      if (typeof currSerId !== "undefined") {
        displayServiceDetailsPKS(currSerId, detTblBody);
      } else if (typeof currServId !== "undefined") {
        displayTripDetailsPKS(currServId, currTripId, detTblBody);
      }
    });
  });
}

function displayPKSServices(dayType, tbodyEl) {
  tbodyEl.innerHTML = "";
  arrayOfServicesPKS.forEach((e) => {
    //skip services which do not operate on selected dayType
    if (e.dayType != dayType || e.trips.length === 0) {
      return;
    }
    if (e.code.startsWith(searchServiceItp.value) && (e.hasLine(searchLineItp.value) || searchLineItp.value == "")) {
      //display service in table
      let tempNewRow = tbodyEl.insertRow(-1);
      let newCell1 = tempNewRow.insertCell(-1);
      let newCell2 = tempNewRow.insertCell(-1);
      let newCell3 = tempNewRow.insertCell(-1);
      newCell3.classList.add("tblVehNo");
      newCell3.setAttribute("id", "veh-sv-" + e.id)
      let newCell4 = tempNewRow.insertCell(-1);
      let newCell5 = tempNewRow.insertCell(-1);
      let newCell6 = tempNewRow.insertCell(-1);
      newCell1.innerHTML =
        "<a href='brygdetPKS.html?id=" + e.id + "&ttidPKS=" + ttidPKS + "'>" + e.code + "</a>";
      if (e.serviceType == "1ZM") {
        newCell1.classList.add("brig1zm");
      } else if (e.serviceType == "BIS") {
        newCell1.classList.add("brigbis");
      } else if (e.serviceType == "ND") {
        newCell1.classList.add("red-bg");
      }
      newCell1.classList.add("bold-txt");
      newCell2.innerHTML = e.createLinesString();
      let vehicleLogged = false;
      for (let i = 0; i < arrayOfVehiclesPKS.length; i++) {
        if (e.acceptedVal.includes(arrayOfVehiclesPKS[i].service)) {
          let compDate = new Date();
          let vehDate = new Date(arrayOfVehiclesPKS[i].pos_date);
          let vehDate2 = new Date(arrayOfVehiclesPKS[i].pos_date2);
          let cond1 = (compDate - vehDate) / 1000 <= 120;
          let cond2 = ((compDate - vehDate2) / 1000 <= 120 && (compDate - vehDate2) / 1000 >= 0);
          let condHolidays = (compDate.toISOString().split('T')[0] >= "2024-06-24" && compDate.toISOString().split('T')[0] <= "2024-08-31" && dayType == "PW") || (compDate.toISOString().split('T')[0] >= "2024-09-01" && dayType == "PS") || !["PS", "PW"].includes(dayType); 
          if ((cond1 || cond2) && condHolidays) {
            newCell3.innerHTML = '<i class="fa-solid fa-wifi" style="color: #77dd77;"></i> ' + arrayOfVehiclesPKS[i].id;
            vehicleLogged = true;
          }
          break;
        }
      }
      if (!vehicleLogged) {
        newCell3.innerHTML = '<i class="fa-solid fa-wifi" style="color: #ff6961;"></i>';
        newCell3.classList.add("missing");
      }
      if (e.startTime[0] == '0')
        newCell4.textContent = e.startTime.slice(1);
      else
        newCell4.textContent = e.startTime;
      if (e.endTime[0] == '0')
        newCell5.textContent = e.endTime.slice(1);
      else
        newCell5.textContent = e.endTime;
      newCell6.textContent = e.dist.toFixed(1);
    }
  });
}

function displayServiceDetailsPKS(id, tbodyEl) {
  for (let i = 0; i < arrayOfServicesPKS.length; i++) {
    if (arrayOfServicesPKS[i].id == id) {
      brygCodeEl.textContent = arrayOfServicesPKS[i].code;
      if (arrayOfServicesPKS[i].dayType == "PS") {
        dayTypeDet.textContent = "Rozkład roboczy szkolny";
      } else if (arrayOfServicesPKS[i].dayType == "PW") {
        dayTypeDet.textContent = "Rozkład roboczy wolny od nauki szkolnej";
      } else if (arrayOfServicesPKS[i].dayType == "SS") {
        dayTypeDet.textContent = "Rozkład sobotni";
      } else if (arrayOfServicesPKS[i].dayType == "NS") {
        dayTypeDet.textContent = "Rozkład niedzielny, świąteczny";
      }
      document.title = "Rozkład brygady: " + arrayOfServicesPKS[i].code;
      //insert service overview here
      if (arrayOfServicesPKS[i].serviceType == "1ZM") {
        brygTypeEl.textContent = "Brygada jednozmianowa";
        let tempNewRow2 = brygStatsEl.insertRow(-1);
        let tempNewCell1 = tempNewRow2.insertCell(-1);
        let tempNewCell2 = tempNewRow2.insertCell(-1);
        let tempNewCell3 = tempNewRow2.insertCell(-1);
        let tempNewCell4 = tempNewRow2.insertCell(-1);
        let tempNewCell5 = tempNewRow2.insertCell(-1);
        if (parseInt(arrayOfServicesPKS[i].startTime.split(":")[0]) < 10)
          tempNewCell1.textContent = "A";
        else if (arrayOfServicesPKS[i].code.indexOf("N") == -1)
          tempNewCell1.textContent = "B";
        else
          tempNewCell1.textContent = "C";
        let startMinutes =
          parseInt(
            arrayOfServicesPKS[i].startTime.substring(
              0,
              arrayOfServicesPKS[i].startTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServicesPKS[i].startTime.substring(
              arrayOfServicesPKS[i].startTime.indexOf(":") + 1
            )
          );
        if (startMinutes < 0) {
          startMinutes += 1440;
        }
        let tempMin = startMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        let newMinutesStr = parseInt(startMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        let endMinutes =
          parseInt(
            arrayOfServicesPKS[i].trips[
              arrayOfServicesPKS[i].trips.length - 1
            ].endTime.substring(
              0,
              arrayOfServicesPKS[i].trips[
                arrayOfServicesPKS[i].trips.length - 1
              ].endTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServicesPKS[i].trips[
              arrayOfServicesPKS[i].trips.length - 1
            ].endTime.substring(
              arrayOfServicesPKS[i].trips[
                arrayOfServicesPKS[i].trips.length - 1
              ].endTime.indexOf(":") + 1
            )
          );
        if (endMinutes >= 1440) {
          endMinutes -= 1440;
        }
        tempMin = endMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(endMinutes / 60) + ":" + tempMin;
        tempNewCell3.textContent = newMinutesStr;
        let finalMinutes;
        if (endMinutes > startMinutes) {
          finalMinutes = endMinutes - startMinutes;
        } else {
          finalMinutes = endMinutes - startMinutes + 1440;
        }
        tempMin = finalMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(finalMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = arrayOfServicesPKS[i].dist.toFixed(1);
      } else if (arrayOfServicesPKS[i].serviceType == "BIS") {
        brygTypeEl.textContent = "Brygada szczytowa";
        let tempNewRow2 = brygStatsEl.insertRow(-1);
        let tempNewCell1 = tempNewRow2.insertCell(-1);
        let tempNewCell2 = tempNewRow2.insertCell(-1);
        let tempNewCell3 = tempNewRow2.insertCell(-1);
        let tempNewCell4 = tempNewRow2.insertCell(-1);
        let tempNewCell5 = tempNewRow2.insertCell(-1);
        tempNewCell1.textContent = "A (BIS)";
        let startMinutes =
          parseInt(
            arrayOfServicesPKS[i].startTime.substring(
              0,
              arrayOfServicesPKS[i].startTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServicesPKS[i].startTime.substring(
              arrayOfServicesPKS[i].startTime.indexOf(":") + 1
            )
          );
        if (startMinutes < 0) {
          startMinutes += 1440;
        }
        let tempMin = startMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        let newMinutesStr = parseInt(startMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        arrayOfServicesPKS[i].getShiftTimeAndPartialDist();
        let partEndTime, partStartTime;
        for (let j = 0; j < arrayOfServicesPKS[i].trips.length; j++) {
          if (arrayOfServicesPKS[i].trips[j].shift == "P") {
            partEndTime = arrayOfServicesPKS[i].trips[j].endTime;
            if (arrayOfServicesPKS[i].trips[j + 1].servStart == undefined)
              partStartTime = arrayOfServicesPKS[i].trips[j + 1].startTime;
            else
              partStartTime = arrayOfServicesPKS[i].trips[j + 1].servStart;
            break;
          }
        }
        if (partEndTime[0] == "0")
          tempNewCell3.textContent = partEndTime.slice(1);
        else
          tempNewCell3.textContent = partEndTime;
        let partEndMinutes =
          parseInt(partEndTime.substring(0, partEndTime.indexOf(":"))) * 60 +
          parseInt(partEndTime.substring(partEndTime.indexOf(":") + 1));
        let partAMinutes = partEndMinutes - startMinutes;
        tempMin = partAMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(partAMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = arrayOfServicesPKS[i].distA.toFixed(1);
        tempNewRow2 = brygStatsEl.insertRow(-1);
        tempNewCell1 = tempNewRow2.insertCell(-1);
        tempNewCell2 = tempNewRow2.insertCell(-1);
        tempNewCell3 = tempNewRow2.insertCell(-1);
        tempNewCell4 = tempNewRow2.insertCell(-1);
        tempNewCell5 = tempNewRow2.insertCell(-1);
        tempNewCell1.textContent = "B (BIS)";
        tempNewCell2.textContent = partStartTime;
        let endMinutes =
          parseInt(
            arrayOfServicesPKS[i].trips[
              arrayOfServicesPKS[i].trips.length - 1
            ].endTime.substring(
              0,
              arrayOfServicesPKS[i].trips[
                arrayOfServicesPKS[i].trips.length - 1
              ].endTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServicesPKS[i].trips[
              arrayOfServicesPKS[i].trips.length - 1
            ].endTime.substring(
              arrayOfServicesPKS[i].trips[
                arrayOfServicesPKS[i].trips.length - 1
              ].endTime.indexOf(":") + 1
            )
          );
        if (endMinutes >= 1440) {
          endMinutes -= 1440;
        }
        tempMin = endMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(endMinutes / 60) + ":" + tempMin;
        tempNewCell3.textContent = newMinutesStr;
        let partStartMinutes =
          parseInt(partStartTime.substring(0, partStartTime.indexOf(":"))) *
          60 +
          parseInt(partStartTime.substring(partStartTime.indexOf(":") + 1));
        let partBMinutes;
        if (endMinutes > partStartMinutes) {
          partBMinutes = endMinutes - partStartMinutes;
        } else {
          partBMinutes = endMinutes - partStartMinutes + 1440;
        }
        tempMin = partBMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(partBMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = arrayOfServicesPKS[i].distB.toFixed(1);
        tempNewRow2 = brygStatsEl.insertRow(-1);
        tempNewCell1 = tempNewRow2.insertCell(-1);
        tempNewCell1.setAttribute("colspan", "3");
        tempNewCell1.textContent = "Razem: ";
        tempNewCell2 = tempNewRow2.insertCell(-1);
        tempNewCell3 = tempNewRow2.insertCell(-1);
        let finalMinutes = partAMinutes + partBMinutes;
        tempMin = finalMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(finalMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        tempNewCell3.textContent = arrayOfServicesPKS[i].dist.toFixed(1);
      } else if (arrayOfServicesPKS[i].serviceType == "2ZM") {
        brygTypeEl.textContent = "Brygada dwuzmianowa";
        let tempNewRow2 = brygStatsEl.insertRow(-1);
        let tempNewCell1 = tempNewRow2.insertCell(-1);
        let tempNewCell2 = tempNewRow2.insertCell(-1);
        let tempNewCell3 = tempNewRow2.insertCell(-1);
        let tempNewCell4 = tempNewRow2.insertCell(-1);
        let tempNewCell5 = tempNewRow2.insertCell(-1);
        tempNewCell1.textContent = "A";
        let startMinutes =
          parseInt(
            arrayOfServicesPKS[i].startTime.substring(
              0,
              arrayOfServicesPKS[i].startTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServicesPKS[i].startTime.substring(
              arrayOfServicesPKS[i].startTime.indexOf(":") + 1
            )
          );
        if (startMinutes < 0) {
          startMinutes += 1440;
        }
        let tempMin = startMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        let newMinutesStr = parseInt(startMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        arrayOfServicesPKS[i].getShiftTimeAndPartialDist();
        tempNewCell3.textContent = arrayOfServicesPKS[i].shiftTime;
        let partEndMinutes =
          parseInt(tempNewCell3.textContent.substring(0, tempNewCell3.textContent.indexOf(":"))) * 60 +
          parseInt(tempNewCell3.textContent.substring(tempNewCell3.textContent.indexOf(":") + 1));
        let partAMinutes = partEndMinutes - startMinutes;
        tempMin = partAMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(partAMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = arrayOfServicesPKS[i].distA.toFixed(1);
        tempNewRow2 = brygStatsEl.insertRow(-1);
        tempNewCell1 = tempNewRow2.insertCell(-1);
        tempNewCell2 = tempNewRow2.insertCell(-1);
        tempNewCell3 = tempNewRow2.insertCell(-1);
        tempNewCell4 = tempNewRow2.insertCell(-1);
        tempNewCell5 = tempNewRow2.insertCell(-1);
        tempNewCell1.textContent = "B";
        tempNewCell2.textContent = arrayOfServicesPKS[i].shiftTime2;
        let endMinutes =
          parseInt(
            arrayOfServicesPKS[i].trips[
              arrayOfServicesPKS[i].trips.length - 1
            ].endTime.substring(
              0,
              arrayOfServicesPKS[i].trips[
                arrayOfServicesPKS[i].trips.length - 1
              ].endTime.indexOf(":")
            )
          ) *
          60 +
          parseInt(
            arrayOfServicesPKS[i].trips[
              arrayOfServicesPKS[i].trips.length - 1
            ].endTime.substring(
              arrayOfServicesPKS[i].trips[
                arrayOfServicesPKS[i].trips.length - 1
              ].endTime.indexOf(":") + 1
            )
          );
        if (endMinutes >= 1440) {
          endMinutes -= 1440;
        }
        tempMin = endMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(endMinutes / 60) + ":" + tempMin;
        tempNewCell3.textContent = newMinutesStr;
        let partStartMinutes =
          parseInt(tempNewCell2.textContent.substring(0, tempNewCell2.textContent.indexOf(":"))) *
          60 +
          parseInt(tempNewCell2.textContent.substring(tempNewCell2.textContent.indexOf(":") + 1));
        let partBMinutes;
        if (endMinutes > partStartMinutes) {
          partBMinutes = endMinutes - partStartMinutes;
        } else {
          partBMinutes = endMinutes - partStartMinutes + 1440;
        }
        tempMin = partBMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(partBMinutes / 60) + ":" + tempMin;
        tempNewCell4.textContent = newMinutesStr;
        tempNewCell5.textContent = arrayOfServicesPKS[i].distB.toFixed(1);
        tempNewRow2 = brygStatsEl.insertRow(-1);
        tempNewCell1 = tempNewRow2.insertCell(-1);
        tempNewCell1.setAttribute("colspan", "3");
        tempNewCell1.textContent = "Razem: ";
        tempNewCell2 = tempNewRow2.insertCell(-1);
        tempNewCell3 = tempNewRow2.insertCell(-1);
        let finalMinutes = partAMinutes + partBMinutes;
        tempMin = finalMinutes % 60;
        if (tempMin < 10) {
          tempMin = "0" + tempMin;
        }
        newMinutesStr = parseInt(finalMinutes / 60) + ":" + tempMin;
        tempNewCell2.textContent = newMinutesStr;
        tempNewCell3.textContent = arrayOfServicesPKS[i].dist.toFixed(1);
      }
      const koloryLinii = [
        {
          col: "#3498DB",
          line: null
        },
        {
          col: "#2ECC71",
          line: null
        },
        {
          col: "#A569BD",
          line: null
        },
        {
          col: "#F39C12",
          line: null
        },
        {
          col: "#C0392B",
          line: null
        },
        {
          col: "#F1C40F",
          line: null
        },
        {
          col: "#16A085",
          line: null
        }
      ]
      for (let j = 0; j < arrayOfServicesPKS[i].trips.length; j++) {
        let tempNewRow = tbodyEl.insertRow(-1);
        let newCell1 = tempNewRow.insertCell(-1);
        let newCell2 = tempNewRow.insertCell(-1);
        let newCell3 = tempNewRow.insertCell(-1);
        let newCell4 = tempNewRow.insertCell(-1);
        let newCell5 = tempNewRow.insertCell(-1);
        let newCell6 = tempNewRow.insertCell(-1);
        let newCell7 = tempNewRow.insertCell(-1);
        newCell4.style.setProperty("font-weight", "bold");
        newCell1.innerHTML =
          "<a href='tripDetPKS.html?id=" +
          arrayOfServicesPKS[i].id +
          "&id2=" +
          arrayOfServicesPKS[i].trips[j].ID +
          "&ttidPKS=" + ttidPKS + "'>" +
          (j + 1) +
          ".</a>";
        newCell2.textContent = arrayOfServicesPKS[i].trips[j].Linia;
        newCell2.classList.add("bold-txt");

        let colorLines = localStorage.getItem('colorLines');

        if (colorLines === null) {
          localStorage.setItem('colorLines', 'false');
          colorLines = 'false'; // Update isChecked variable
        }

        if (true) {
          if (!["Doj", "Zj", "PTech", arrayOfServicesPKS[i].code.slice(0, 3)].includes(String(arrayOfServicesPKS[i].trips[j].Linia))) {
            for (let k = 0; k < koloryLinii.length; k++) {
              if (koloryLinii[k].line == null) {
                koloryLinii[k].line = arrayOfServicesPKS[i].trips[j].Linia;
                newCell2.style.setProperty("background-color", koloryLinii[k].col);
                break;
              }
              if (koloryLinii[k].line == arrayOfServicesPKS[i].trips[j].Linia) {
                newCell2.style.setProperty("background-color", koloryLinii[k].col);
                break;
              }
            }
          }
          if (["Doj", "Zj", "PTech"].includes(arrayOfServicesPKS[i].trips[j].Linia)) {
            newCell2.style.setProperty("background-color", "#000000");
          }
        }
        newCell3.textContent = arrayOfServicesPKS[i].trips[j].Stops[0].Name;
        newCell4.textContent = arrayOfServicesPKS[i].trips[j].Stops.at(-1).Name;
        if (arrayOfServicesPKS[i].trips[j].Stops[0].Time[0] == "0")
          newCell5.textContent = arrayOfServicesPKS[i].trips[j].Stops[0].Time.slice(1);
        else
          newCell5.textContent = arrayOfServicesPKS[i].trips[j].Stops[0].Time;
        if (arrayOfServicesPKS[i].trips[j].Stops.at(-1).Time[0] == "0")
          newCell6.textContent = arrayOfServicesPKS[i].trips[j].Stops.at(-1).Time.slice(1);
        else
          newCell6.textContent = arrayOfServicesPKS[i].trips[j].Stops.at(-1).Time;
        newCell7.textContent = parseFloat(arrayOfServicesPKS[i].trips[j].dist).toFixed(1);
        if (arrayOfServicesPKS[i].trips[j].shift == "B") {
          let breakRow = tbodyEl.insertRow(-1);
          let c1 = breakRow.insertCell(-1);
          let c2 = breakRow.insertCell(-1);
          let c3 = breakRow.insertCell(-1);
          c1.setAttribute("colspan", "2");
          c2.setAttribute("colspan", "2");
          c3.setAttribute("colspan", "3");
          c1.textContent = "Zak. A";
          c2.textContent = arrayOfServicesPKS[i].trips[j].Stops.at(-1).Name;
          c3.textContent = arrayOfServicesPKS[i].shiftTime;
          breakRow.classList.add("shift-stop", "podmiana-info");
          breakRow = tbodyEl.insertRow(-1);
          c1 = breakRow.insertCell(-1);
          c2 = breakRow.insertCell(-1);
          c3 = breakRow.insertCell(-1);
          c1.setAttribute("colspan", "2");
          c2.setAttribute("colspan", "2");
          c3.setAttribute("colspan", "3");
          c1.textContent = "Rozp. B";
          c2.textContent = c2.textContent = arrayOfServicesPKS[i].trips[j + 1].Stops[0].Name;
          c3.textContent = arrayOfServicesPKS[i].shiftTime2;
          breakRow.classList.add("shift-stop", "podmiana-info");
        }
        if (arrayOfServicesPKS[i].trips[j].shift == "P") {
          let breakRow = tbodyEl.insertRow(-1);
          let c1 = breakRow.insertCell(-1);
          let c2 = breakRow.insertCell(-1);
          let c3 = breakRow.insertCell(-1);
          let c4 = breakRow.insertCell(-1);
          c1.setAttribute("colspan", "4");
          c1.textContent = "Przerwa szczytowa";
          c2.textContent = arrayOfServicesPKS[i].shiftTime;
          c3.textContent = arrayOfServicesPKS[i].shiftTime2;
          const timeDiff = calculateTimeDifference(arrayOfServicesPKS[i].trips[j].endTime, arrayOfServicesPKS[i].trips[j + 1].startTime);
          c4.textContent = timeDiff.hours + ":";
          if (timeDiff.minutes < 10)
            c4.textContent += '0';
          c4.textContent += timeDiff.minutes;
          breakRow.classList.add("bis-shift", "podmiana-info");
        }
      }
    }
  }
}

function displayTripDetailsPKS(sId, tId, tbodyEl) {
  let ctr = 1;
  let currTime, currH, currMin;
  for (let i = 0; i < arrayOfServicesPKS.length; i++) {
    if (arrayOfServicesPKS[i].id == sId) {
      servBaseInfoEl.textContent = arrayOfServicesPKS[i].code + " - ";
      brygTtBtn.setAttribute(
        "href",
        "brygdetPKS.html?id=" + arrayOfServicesPKS[i].id + "&ttidPKS=" + ttidPKS
      );
      servBaseInfoEl.textContent += arrayOfServicesPKS[i].dayType;
      for (let j = 0; j < arrayOfServicesPKS[i].trips.length; j++) {
        if (arrayOfServicesPKS[i].trips[j].ID == tId) {
          document.title = "Rozkład kursu: " + arrayOfServicesPKS[i].trips[j].ID + "(" + arrayOfServicesPKS[i].code + "/" + arrayOfServicesPKS[i].trips[j].order + ")";
          courseSeqEl.textContent =
            "Kurs nr: " + (j + 1) + ` (${arrayOfServicesPKS[i].trips[j].ID})`
          let breakBefore = undefined;
          let breakAfter = undefined;
          if (j != 0) {
            prevBtn.setAttribute(
              "href",
              "tripDetPKS.html?id=" +
              arrayOfServicesPKS[i].id +
              "&id2=" +
              arrayOfServicesPKS[i].trips[j - 1].ID + "&ttidPKS=" + ttidPKS
            );
            const timeDiff = calculateTimeDifference(arrayOfServicesPKS[i].trips[j - 1].endTime, arrayOfServicesPKS[i].trips[j].startTime);
            breakBefore = timeDiff.hours + ":" + String(timeDiff.minutes).padStart(2, "0");
          } else {
            prevBtn.classList.add("btn-disabled");
            prevBtn.removeAttribute("href");
          }
          if (j < arrayOfServicesPKS[i].trips.length - 1) {
            nextBtn.setAttribute(
              "href",
              "tripDetPKS.html?id=" +
              arrayOfServicesPKS[i].id +
              "&id2=" +
              arrayOfServicesPKS[i].trips[j + 1].ID + "&ttidPKS=" + ttidPKS
            );
            const timeDiff = calculateTimeDifference(arrayOfServicesPKS[i].trips[j].endTime, arrayOfServicesPKS[i].trips[j + 1].startTime);
            breakAfter = timeDiff.hours + ":" + String(timeDiff.minutes).padStart(2, "0");
          } else {
            nextBtn.classList.add("btn-disabled");
            nextBtn.removeAttribute("href");
          }

          //todo: wyświetlenie breakBefore i breakAfter


          baseInfoEl.innerHTML = arrayOfServicesPKS[i].trips[j].Linia + " ";
          baseInfoEl.innerHTML +=
            arrayOfServicesPKS[i].trips[j].Stops[0].Name +
            '<i class="fa-solid fa-arrow-right"></i>' + arrayOfServicesPKS[i].trips[j].Stops.at(-1).Name;

          arrayOfServicesPKS[i].trips[j].Ozn.forEach(symbol => {
            const oznaczenie = document.createElement("h6");
            const txtNode = document.createTextNode(`${symbol.ozn} - ${symbol.nazwa.trim()}`);
            oznaczenie.appendChild(txtNode);
            document.querySelector(".trip-btn").before(oznaczenie);
          })

          let ctr = 1;

          arrayOfServicesPKS[i].trips[j].Stops.forEach(stop => {
            let tempNewRow = tbodyEl.insertRow(-1);
            let newCell1 = tempNewRow.insertCell(-1);
            let newCell2 = tempNewRow.insertCell(-1);
            let newCell3 = tempNewRow.insertCell(-1);
            let newCell4 = tempNewRow.insertCell(-1);
            newCell1.textContent = ctr + ".";
            newCell2.textContent = stop.Name;
            if(stop.Time2 != undefined){
              newCell1.setAttribute("rowspan", 2);
              newCell2.setAttribute("rowspan", 2);
              newCell4.setAttribute("rowspan", 2);
              let tempNewRow2 = tbodyEl.insertRow(-1);
              let newCell3B = tempNewRow2.insertCell(-1);
              if (stop.Time2[0] == "0")
                newCell3B.textContent = stop.Time2.slice(1);
              else
                newCell3B.textContent = stop.Time2;
            }
            if (stop.Time[0] == "0")
              newCell3.textContent = stop.Time.slice(1);
            else
              newCell3.textContent = stop.Time;
            newCell4.textContent = (parseFloat(stop.Dist) - parseFloat(arrayOfServicesPKS[i].trips[j].Stops[0].Dist)).toFixed(1);

            ctr++;
          })

          break;
        }
      }
      break;
    }
  }
}