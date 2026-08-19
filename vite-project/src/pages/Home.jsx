import React from 'react'
import Hero from '../Component/Hero';
import CoreRoles from '../Component/CoreRoles';
import ProductSection from '../Products/ProductSection.jsx';
import SalesNetwork from '../Component/SalesNetwork.jsx';
import About from './About.jsx';
import WhyChooseUs from '../Component/WhyChooseUs.jsx';
import Service from './Service.jsx';


const Home = () => {
  return (
    <div>
      <Hero/>
      <CoreRoles/>
      <ProductSection/>
      <Service/>
      {/* <SalesNetwork/> */}
      <WhyChooseUs/>
    </div>
  )
}

export default Home;
