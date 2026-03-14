import { useState } from "react";
import React from 'react';
import PingLocation from "./location";


function SidePanel({ sideBarOpened }) {
    function addIP() {
        if (ipPartsList.length < 7) {
            setIP_LENGHT(prev => prev + 1)
            ipPartsList.push(new PingAttributes(ipPartsList.length, ["", "", "", ""]))
        }
    }

    function removeIP() {
        if (ipPartsList.length > 1) {
            setIP_LENGHT(prev => prev - 1)
            ipPartsList.pop()
        }
    }

console.log("sidepanel");

    return (
        <div className={`sideBar ${sideBarOpened ? 'opened' : ''}`}>
            <div className='topSection'>
                <div className='addIP_buttons'>
                    <span onClick={addIP}>+</span>
                    <span onClick={removeIP} >-</span>
                </div>
                <PingLocation />
            </div>
        </div>
    );
}

export default SidePanel;