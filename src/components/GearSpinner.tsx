import React from "react";
import '../components/css/GearSpinner.css'
export const GearSpinner = ()=>{

    return(
        <div className="gearbox">
            <div className="pic picOne"><img src={require('../../src/assets/img/35357-7-gears-file.png')} alt=""/></div>
            <div className="pic picTwo"><img src={require('../../src/assets/img/35357-7-gears-file.png')} alt=""/></div>
        </div>

    )
}