

import { useEffect } from "react";

const useReferral = () => {
    useEffect(() => {
        if(typeof window !== "undefined" ) {
        const urlParams = new URLSearchParams(window.location.search);
        const refId = urlParams.get("ref") as string | undefined;

        if (refId) {
            window.localStorage.setItem("referralId", refId); 
        }
    }
    }, []); 
};

const getReferral = () => {
    if(typeof window !== "undefined" ) {
    const refId = window.localStorage.getItem("referralId");
    return refId;  // returns null if referralId not found in localStorage
    }
}

export {useReferral, getReferral};

