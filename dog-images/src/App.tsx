import React from "react";
import "./App.css";

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

const App: React.VFC = () => {

  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
