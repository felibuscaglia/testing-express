import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import MapEditor from "screens/MapEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/edit" element={<MapEditor />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
