import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsCards from "./components/NewsCards";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <div className="App h-screen w-full ">
        <Navbar></Navbar>
        <Hero></Hero>
        <NewsCards></NewsCards>
        <Footer></Footer>
      </div>
    
    </>
  );
}

export default App;
