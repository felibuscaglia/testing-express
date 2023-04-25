import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "screens/Splash";
import MapEditor from "screens/MapEditor";
import HomeScreen from "screens/Home";
import AuthGuard from "guards/AuthGuard";
import UnAuthGuard from "guards/UnAuthGuard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnAuthGuard component={SplashScreen} />} />
        <Route path="/maps" element={<AuthGuard component={HomeScreen} />} />
        <Route
          path="/edit/:mapId"
          element={<AuthGuard component={MapEditor} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
