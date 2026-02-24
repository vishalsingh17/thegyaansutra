import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const Banner = ({ isVisible, bannerMessage, onClose }) => {

    const handleClose = () => {
        if (isVisible) {
            onClose();
        }
    }
    return (
        isVisible && (
            <div className="bg-gray-900 text-white text-center py-2 px-4 flex items-center relative lg:fixed top-0 left-0 w-full z-50">
                <span className="mx-auto font-semibold">{bannerMessage}</span>
                <button className="ml-4 text-white" onClick={handleClose}>
                    <CloseIcon />
                </button>
            </div>
        )
    );
};

export default Banner;