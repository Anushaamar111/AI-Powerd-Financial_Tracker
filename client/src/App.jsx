import Dashboard from "./pages/Dashoard";
import Login from "./pages/login";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AISuggestion from "./pages/AISuggestion";
import Chatbot from "./pages/Chatbot";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aisuggestion" element={<AISuggestion />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
