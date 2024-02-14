import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsCards from "./components/NewsCards";
import Footer from "./components/Footer";
function App() {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "App h-screen w-full " },
            React.createElement(Navbar, null),
            React.createElement(Hero, null),
            React.createElement(NewsCards, null),
            React.createElement(Footer, null))));
}
export default App;
