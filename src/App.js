import { Routes, Route, Link } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Auth, Home } from "./pages";
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
