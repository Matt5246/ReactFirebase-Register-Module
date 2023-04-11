import React from "react";
import Signup from "./Signup.js";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Signin from "./Signin.js";
import PrivateRoutes from "./privateRoutes.js";
import ForgotPassword from "./ForgotPassword.js";
import UpdateProfile from "./UpdateProfile.js";
import SignupSummary from "./SignupSummary.js";
import '../App.css'
import SignupPage from "./SignupPage.js";

const backgroundImage = { 
  space: 'https://img.freepik.com/free-vector/watercolor-galaxy-background_79603-2384.jpg?w=1800&t=st=1681209009~exp=1681209609~hmac=4a34b2c15c814b2bb71454d6b3923a47246cf2eff398f3e94dfaad525190bd87',
  lines: 'https://img.freepik.com/free-vector/gradient-dynamic-purple-lines-background_23-2148995757.jpg?w=1800&t=st=1681151560~exp=1681152160~hmac=2c2184f7d8f71c3918d910fcb6d2c65d294416b96b5dba71a03a2ce4a755d050',
}
const lightTheme = {
  text: "#000000",
};

const darkTheme = {
  text: "#ffffff",
};
function App() {
  const selectedBackgroundImage = backgroundImage.space;
  const [theme, setTheme] = React.useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  return (
    <div style={{backgroundImage:` url(${selectedBackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    height: "100%",
    color: theme.text,
    }}>
    
      <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
        <AuthProvider>
          <Router>
            <Routes>
               <Route element={<PrivateRoutes/>}>
                <Route path="/update-profile" element={<UpdateProfile textColor={theme.text}/>} />
                <Route path="/" element={<Dashboard textColor={theme.text}/>} />
               </Route>
              <Route path="/signup-summary" element={<SignupSummary textColor={theme.text}/>} />
              <Route path="/signup" element={<Signup textColor={theme.text}/>} />
              <Route path="/signup-page" element={<SignupPage textColor={theme.text}/>} />
              <Route path="/signin" element={<Signin textColor={theme.text} />} />        
              <Route path="/forgot-password" element={<ForgotPassword textColor={theme.text}/>} />    
            </Routes>
          </Router>
        </AuthProvider>          
        </div>
      </Container>
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px",
          borderRadius: "50%",
          background: theme.text,
          border: "none",
          outline: "none",
        }}
        onClick={toggleTheme}
      ></button>
      </div>
  );
}

export default App;
