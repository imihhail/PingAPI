export class PingAttributes {
    pingLog    = []
    pingCount  = 0
    errorCount = 0
    pingSum    = 0
    avg        = null
    speed      = null

    constructor(id, ip = ['', '', '', '']) {
        this.id = id
        this.ip = ip
    }

    calculatePingStats(std, str) {
        //EXTRACT PINGRESPONSE AND PINGSPEED
        const text       = str.toString();
        const pingOutput = text.split(/\r?\n/)[std];
        const speedArr   = pingOutput.match(/time(?:=|<)\s*([0-9]*\.?[0-9]+)/i);
        const pingSpeed  = speedArr ? parseFloat(speedArr[1]) : null
        this.speed       = Math.round(pingSpeed)

        //CALCULATE STATS
        this.pingCount++
        this.pingSum   = this.pingSum + this.speed
        this.avg       = Math.round(this.pingSum / this.pingCount)

        this.pingLog.push(pingOutput)
    }
}



