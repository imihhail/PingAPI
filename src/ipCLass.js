export class PingAttributes {
    pingLog    = []
    pingCount  = 0
    errorCount = 0
    pingSum    = 0
    packetLoss = 0
    avg        = null
    speed      = null
    connection = false

    constructor(id, ip = ['', '', '', '']) {
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




function name1() {
    name3()
    function name2() {
        function name3() {
            console.log("name3");
            
        }
    }
}

name1()