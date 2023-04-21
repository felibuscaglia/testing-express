import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "screens/Splash";
import MapEditor from "screens/MapEditor";
import HomeScreen from "screens/Home";

// TODO: AuthGuard

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/maps" element={<HomeScreen />} />
        <Route path="/edit" element={<MapEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
