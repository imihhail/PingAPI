export class PingAttributes {
    pingLog = []
    pingCount = 0
    errorCount = 0
    avg = null
    pingSum = 0
    outPut = null

    constructor(ip) {
        this.ip = ip
    }
}

const test = new PingAttributes(0, '8.8.8.8')


