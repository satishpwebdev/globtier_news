import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import NewsCards from "./components/NewsCards.tsx";
function App() {
  return (
    <>
      <div className="App h-screen w-full px-16">
        <Navbar></Navbar>
        <Hero></Hero>
        <NewsCards></NewsCards>
      </div>
    </>
  );
}

export default App;
