import { BrowserRouter as Router, Route, Routes, Form } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

import ArticlesListes from "./pages/ArticlesListes";
import NavBar from "./componenets/NavBar";


function App() {
  return (
    <Router>
      <NavBar  />
      <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles-list" element={<ArticlesListes />} />
          <Route path="/article/:name" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
