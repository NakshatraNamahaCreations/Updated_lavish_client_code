
import React from "react";
import grid1 from "../assets/momentsgallery1.png"
import grid2 from "../assets/momentsgallery2.png"
import grid3 from "../assets/momentsgallery3.png"
import grid4 from "../assets/momentsgallery4.png"
import grid5 from "../assets/momentsgallery5.png"
import grid6 from "../assets/momentsgallery6.png"
import grid7 from "../assets/momentsgallery7.png"
import grid8 from "../assets/momentsgallery8.png"


const PhotoGrid = () => {
    return (
        <div className="bg-gray-100 lg:min-h-screen px-4 flex g:gap-4 gap-1 justify-center  pb-5">
            <div>
                <img src={grid1} className="lg:pb-5 pb-2 " />
                <img src={grid2} className="" />
            </div>
            <div>
                <img src={grid3} className="lg:pt-10 lg:pb-5 pt-5 pb-2" />
                <img src={grid4} className="" />
            </div>
            <div>
                <img src={grid5} className="lg:pb-5 lg:pt-3 pb-2 pt-2" />
                <img src={grid6} className="" />
            </div>
            <div>
                <img src={grid7} className="lg:pb-5 pb-2" />
                <img src={grid8} className="" />
            </div>

        </div>
    )
}

export default PhotoGrid;
