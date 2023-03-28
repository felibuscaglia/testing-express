import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapEditor from "screens/MapEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/edit" element={<MapEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
