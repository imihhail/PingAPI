import React, { useState } from "react";
import TitleBar from './titlebar';
import Content from "./content/content";


export default function Layout() {
    const [sideBarOpened, setSideBarOpened] = useState(false)

    console.log("Layout is rendering");
    
    return (
        <div className='app'>
            <TitleBar setSideBarOpened = { setSideBarOpened }/> 
            <Content sideBarOpened     = { sideBarOpened }/>
        </div>
        )
    }