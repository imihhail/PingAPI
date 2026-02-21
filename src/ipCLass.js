export class PingAttributes {
    pingLog    = []
    pingCount  = 0
    errorCount = 0
    pingSum    = 0
    packetLoss = 0
    avg        = null
    speed      = null

    constructor(id, ip = ['', '', '', '']) {
        this.id = id
        this.ip = ip
    }

    calculatePingStats(std, str) {
        //EXTRACT PING RESPONSE AND PINGSPEED
        console.log("recieved str: ", str);
        
        const text       = str.toString();
        const pingOutput = text.split(/\r?\n/)[std];
        const speedArr   = pingOutput.match(/time(?:=|<)\s*([0-9]*\.?[0-9]+)/i);

        if (speedArr) {
            const pingSpeed = parseFloat(speedArr[1])
            this.speed      = Math.round(pingSpeed) 

        //CALCULATE STATS
            this.pingCount++
            this.pingSum    = this.pingSum + this.speed
            this.avg        = Math.round(this.pingSum / this.pingCount)
            this.packetLoss = Math.round((this.errorCount/(this.pingCount + this.errorCount))*100) 

        //HANDLE STDERROR
        } else {
            this.speed = null
            this.errorCount++
        }

        this.pingLog.push(pingOutput)
    }
}



