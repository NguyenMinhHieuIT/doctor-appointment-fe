import React, { useEffect, useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Testimonial from '../Testimonial/Testimonial';
import ClinicAndSpecialities from '../ClinicAndSpecialities/ClinicAndSpecialities';
import HeroSection from '../HeroSection/HeroSection';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../../Shared/Header/Header';
import Service from '../Services/Service';
import Gallery from '../Gallery/Gallery';
import OurDoctors from '../OurDoctor/OurDoctors';

const Home = () => {
    return (
        <>
            <Header/>
            <HeroSection />
            <InfoPage />
            <Service />
            <ClinicAndSpecialities />
            <OurDoctors/>
            <Testimonial />
            <Footer />
        </>
    );
};

export default Home;