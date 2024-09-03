import React from "react";

import Home from '../contoiners/Home/index';
import { Navigation } from "../components/Navigation";
import { Container } from "react-bootstrap";


function HomePage () {

    return (
        <>
           <Container>
                <Navigation />
                <Home />
           </Container>
        </>

    )
}

export default HomePage;