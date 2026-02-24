export  function startSpeedTest(setSpeed_Mbps) {    
    const controller = new AbortController();

    (async () => {
        const url            = 'https://speed.cloudflare.com/__down?bytes=50000000'; 
        const start          = performance.now();
        let progressInterval = null

        try {
            const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
            if (!res.ok)   throw new Error('HTTP ' + res.status);
            if (!res.body) throw new Error('ReadableStream not supported in this environment');
        
            const reader   = res.body.getReader();
            let bytes      = 0;
            let speed_Mbps = null

            progressInterval = setInterval(() => {
                const endInterval = performance.now()
                const secInterval = (endInterval - start) / 1000;
                const bitInterval = bytes * 8
                speed_Mbps        = (bitInterval / secInterval) / (1024 * 1024)

                setSpeed_Mbps(speed_Mbps.toFixed(2)) 
            }, 300);
        
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                    clearInterval(progressInterval)
                    break;
                } 
                bytes += value.byteLength 
            }

            const end  = performance.now();
            const sec  = (end - start) / 1000;
            const bits = bytes * 8
            speed_Mbps = (bits / sec) / (1024 * 1024);
            
            setSpeed_Mbps(speed_Mbps.toFixed(2)) 
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Download speed fetch was aborted');
                clearInterval(progressInterval)
            } else {
                console.error('Error on getting download speed: ', err);
                clearInterval(progressInterval)
            }
        }
    })()
    
    return controller
}