export async function startSpeedTest() {
    console.log("starting SpeedTest!");
    
    const url   = 'https://speed.cloudflare.com/__down?bytes=50000000'; 
    const start = performance.now();

    const res   = await fetch(url, { cache: 'no-store' });
    if (!res.ok)   throw new Error('HTTP ' + res.status);
    if (!res.body) throw new Error('ReadableStream not supported in this environment');
    
    const reader   = res.body.getReader();
    let bytes      = 0;
    let speed_Mbps = null

    const speedCheckInterval = setInterval(() => {
        const endInterval = performance.now()
        const secInterval  = (endInterval - start) / 1000;
        const bitInterval  = bytes * 8
        speed_Mbps         = (bitInterval / secInterval) / (1024 * 1024)
        console.log(speed_Mbps);
        
    }, 250);

    while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
            clearInterval(speedCheckInterval)
            break;
        } 
        bytes += value.byteLength 
    }



    const end  = performance.now();
    const sec  = (end - start) / 1000;
    const bits = bytes * 8
    speed_Mbps = (bits / sec) / (1024 * 1024);
    
    console.log("Download Mbps:", speed_Mbps.toFixed(2));
}