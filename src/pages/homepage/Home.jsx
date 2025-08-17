import React from "react";
import BestWorkers from "./bestWorkers/BestWorkers";
import Banner from "./banner/Banner";
import ValueMessage from "./valueMessage/ValueMessage";
import HowDifferent from "./howDifferent/HowDifferent";
import TrustedByUsers from "./testimonials/TrustedByUsers";
import StartEarningCTA from "./startEarningCTA/StartEarningCTA";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ValueMessage></ValueMessage>
      <BestWorkers></BestWorkers>
      <HowDifferent></HowDifferent>
      <TrustedByUsers></TrustedByUsers>
      <StartEarningCTA></StartEarningCTA>
    </div>
  );
};

export default Home;
