export class PingAttributes {
    ipLog      = []
    pingCount  = 0
    errorCount = 0
    pingSum    = 0
    packetLoss = 0
    avg        = null
    speed      = null
    connection = false


    constructor(id, ip = ['', '', '', ''], buffer = 30) {
      this.id = id
      this.buffer = buffer

      if (id == 0) {
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

        this.ipLog.push({ pingLog: str, ipConfig: ipConfig })
        
        if (this.ipLog.length > this.buffer) {
          this.ipLog.splice(0, 5)
        }
    }
}



