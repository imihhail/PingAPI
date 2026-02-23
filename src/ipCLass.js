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

export class GoogleClass extends PingAttributes {
    id         = 0
    ip         = ['8', '8', '8', '8']
    speed_Mbps = null
    

    async speedTest() {
        const url = 'https://speed.cloudflare.com/__down?bytes=50000000'; 
        const start = performance.now();

        const res = await fetch(url, { cache: 'no-store' });
        const reader = res.body.getReader();

        let bytes = 0;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            bytes += value.length;
        }

        const end = performance.now();
        const seconds = (end - start) / 1000;
        const bits = bytes * 8;
        const mbps = (bits / seconds) / (1024 * 1024);

        console.log("Download Mbps:", mbps.toFixed(2));
    }
}



