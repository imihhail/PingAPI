export function CreateStorageData() {
    const data = {
        Locations: {
            "Location I": [{id: 0, ip: ["8", "8", "8", "8"]},
                            {id: 1, ip: ["", "", "", ""]},
                            {id: 2, ip: ["", "", "", ""]},
                            {id: 3, ip: ["", "", "", ""]},
                            {id: 4, ip: ["", "", "", ""]}],
            "Location II": [{id: 0, ip: ["8", "8", "8", "8"]},
                            {id: 1, ip: ["", "", "", ""]},
                            {id: 2, ip: ["", "", "", ""]},
                            {id: 3, ip: ["", "", "", ""]},
                            {id: 4, ip: ["", "", "", ""]}],
            "Location III":[{id: 0, ip: ["8", "8", "8", "8"]},
                            {id: 1, ip: ["", "", "", ""]},
                            {id: 2, ip: ["", "", "", ""]},
                            {id: 3, ip: ["", "", "", ""]},
                            {id: 4, ip: ["", "", "", ""]}]                              
        },
        Settings: {
            "LocationId": 0,
            "PingInterval": 2000,
            "DownloadSize": 50,
            "LogMemory": 30
        }
    }       

    return data             
}