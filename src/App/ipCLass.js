export class IpLocation {
  constructor(id, location) {
    this.locationId = id;
    this.location   = location;
  }
}
    // const MAX = 4;
    // let buffer = new Array(MAX);
    // let index = 0;

    // function add(item) {
    //     buffer[index] = item;
    //     index = (index + 1) % MAX;
    // }

export class PingAttributes extends IpLocation {
    ipLog      = new Array(this.circualBuffer)
    bufferInd  = 0
    pingCount  = 0
    errorCount = 0
    pingSum    = 0
    packetLoss = 0
    avg        = null
    speed      = null
    connection = false


    constructor(id, ip = ['', '', '', ''], circualBuffer = 10) {
      super()
      this.id = id
      this.circualBuffer = circualBuffer

      if (id = 0) {
        this.ip = ['8', '8', '8', '8']
      } else {
        this.ip = ip
      }
    }

    calculatePingStats(str, ipConfig) {
        // EXTRACT PING RESPONSE AND PINGSPEED
        const isPingFound   = str.match(/time(?:=|<)\s*([0-9]*\.?[0-9]+)/i);

        if (isPingFound) {
            const pingSpeed = parseFloat(isPingFound[1])
            this.speed      = Math.round(pingSpeed)
            this.connection = true

        // CALCULATE STATS
            this.pingCount++
            this.pingSum    = this.pingSum + this.speed
            this.avg        = Math.round(this.pingSum / this.pingCount)
            this.packetLoss = Math.round((this.errorCount/(this.pingCount + this.errorCount))*100) 

        // HANDLE STDERROR STATS
        } else {
            this.speed = null
            if (this.connection) this.errorCount++
        }

        this.ipLog[this.bufferInd] = { pingLog: str, ipConfig: ipConfig }
        this.bufferInd = (this.bufferInd + 1) % this.circualBuffer;
        //this.ipLog.push({ pingLog: str, ipConfig: ipConfig })
    }
}



