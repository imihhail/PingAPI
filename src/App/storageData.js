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
            "LastLocationId": 0,
            "ipCount": 5,
            "PingFrequency": 2000
        }
    }       

    return data             
}