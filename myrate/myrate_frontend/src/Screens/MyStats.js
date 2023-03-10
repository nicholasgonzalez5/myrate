import React from "react";
import Navbar from "../Components/Navbar";
import { useSelector } from 'react-redux';

const Landing = () => {
    const userProfile = useSelector((state) => { return state.userProfile; });
    return (
        <>
            <Navbar />
            {userProfile.username ? <h2>Viewing Data For: {userProfile.username}</h2> : <h2>Please Login To View User Data</h2>}
        </>
    );
};

export default Landing;
