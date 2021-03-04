import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import "./style.css";
import ChatContextProvider from "./context/ChatContext";
import ProtectedRoute from "./protected/Auth";

function App() {
  return (
    <main className="main h-screen flex justify-center items-center">
      <Router>
        <Switch>
          <ChatContextProvider>
            <Route exact path="/" component={LoginPage} />
            <ProtectedRoute path="/chat/:username" component={ChatPage} />
          </ChatContextProvider>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
