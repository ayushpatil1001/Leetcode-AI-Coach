import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Features from "./pages/Features";
import Roadmap from "./pages/Roadmap";
import Coach from "./pages/Coach";

function App() {
  return (
    <BrowserRouter>

      {/* Background Glow Top Left */}
      <div
        className="
          fixed
          top-[-200px]
          left-[-200px]
          w-[600px]
          h-[600px]
          bg-sky-200/30
          blur-[140px]
          rounded-full
          pointer-events-none
          z-0
        "
      />

      {/* Background Glow Bottom Right */}
      <div
        className="
          fixed
          bottom-[-250px]
          right-[-250px]
          w-[700px]
          h-[700px]
          bg-blue-200/20
          blur-[160px]
          rounded-full
          pointer-events-none
          z-0
        "
      />

      <div className="relative z-10">
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/features"
            element={<Features />}
          />

          <Route
            path="/roadmap"
            element={<Roadmap />}
          />

          <Route
            path="/coach"
            element={<Coach />}
          />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;