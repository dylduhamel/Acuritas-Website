import { BrowserRouter } from "react-router-dom";

import { About, Contact, Team, Solutions, SolutionsText, Hero, Navbar, StarsCanvas, Vision } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-[#010b15] relative bg-cover bg-no-repeat bg-center'>
          <StarsCanvas />
          <Navbar />
          <Hero />
        </div>
        <About />
        <div className="w-full bg-[#010B15] bg-cover">
          <Vision />
        </div>
        <SolutionsText />
        <Solutions />
        <Team />
        <div className='bg-[#010b15] relative z-0'>
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;