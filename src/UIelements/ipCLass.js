export class IpLocation {
  constructor(id, location) {
    this.locationId = id;
    this.location   = location;
  }
}

export const IP_LOCATIONS = Object.freeze([
  new IpLocation(1, "Location I"),
  new IpLocation(2, "Location II"),
  new IpLocation(3, "Location III"),
]);

export class PingAttributes extends IpLocation {
    pingLog    = []
    pingCount  = 0
    errorCount = 0
    pingSum    = 0
    packetLoss = 0
    avg        = null
    speed      = null
    connection = false

    constructor(locationId, location, id, ip = ['', '', '', '']) {
      super(locationId, location); 
      this.id = id
      this.ip = ip
    }

    calculatePingStats(str) {
        //EXTRACT PING RESPONSE AND PINGSPEED
        const isPingFound   = str.match(/time(?:=|<)\s*([0-9]*\.?[0-9]+)/i);

        if (isPingFound) {
            const pingSpeed = parseFloat(isPingFound[1])
            this.speed      = Math.round(pingSpeed)
            this.connection = true

        //CALCULATE STATS
            this.pingCount++
            this.pingSum    = this.pingSum + this.speed
            this.avg        = Math.round(this.pingSum / this.pingCount)
            this.packetLoss = Math.round((this.errorCount/(this.pingCount + this.errorCount))*100) 

        //HANDLE STDERROR STATS
        } else {
            this.speed = null
            if (this.connection) this.errorCount++
        }

        this.pingLog.push(str)
    }
}





