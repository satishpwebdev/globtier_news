import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx';
function App() {
  return (
    <>
      <div className="App h-screen w-full px-24">
       <Navbar></Navbar>
        <Hero></Hero>
      </div>
    </>
  );
}

export default App;
