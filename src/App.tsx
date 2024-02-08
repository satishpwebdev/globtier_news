import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import NewsCards from "./components/NewsCards.tsx";
import Footer from "./components/Footer.tsx";
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
