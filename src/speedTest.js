export async function speedTest() {
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