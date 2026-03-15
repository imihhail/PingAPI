import React, { useContext } from "react";
import { LocationContext } from "../app";
import PingLocation from "./location";
import { PingAttributes } from "./ipCLass";


function SidePanel({ sideBarOpened, ipLength, setIpLength }) {
    const { currentLoc, setCurrentLoc, ipPartsList, setIpPartsList } = useContext(LocationContext)
  const inc = () => setIpLength(prev => (typeof prev === "number" ? prev + 1 : 1));
  const dec = () => setIpLength(prev => (typeof prev === "number" ? Math.max(0, prev - 1) : 0));
    function addIP() {
        if (ipPartsList.length < 7) {
            setIpLength(prev => prev + 1)
            ipPartsList.push(new PingAttributes(ipPartsList.length, ["", "", "", ""]))
        }
    }

    function removeIP() {
        if (ipPartsList.length > 1) {
            setIpLength(prev => prev - 1)
            ipPartsList.pop()
        }
    }
    

    return (
        <div className={`sideBar ${sideBarOpened ? 'opened' : ''}`}>
            <div className='topSection'>
                <div className="ipLines">
                    <span>Locaton:</span>
                    <PingLocation />
                </div>
                <div className="ipLines">
                    <span className="ipLabel">IP lines:</span>

                    <div className="ipControl" role="group" aria-label="IP lines control">
                        <button
                            type="button"
                            className="ipBtn ipBtn-top"
                            onClick={inc}
                            aria-label="Increase IP lines"
                        >
                        ◄
                        </button>

                        <input
                            className="ipNumber"
                            type="number"
                            value={ipLength}
                            readOnly
                            aria-live="polite"
                        />

                        <button
                            type="button"
                            className="ipBtn ipBtn-bottom"
                            onClick={dec}
                            aria-label="Decrease IP lines"
                        >
                        ►
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidePanel;