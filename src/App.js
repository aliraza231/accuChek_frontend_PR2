import './App.css';
import { BrowserRouter } from "react-router-dom";

// All Routes from routes Folder
import RegistrationRoute from './routes/registrationRoute/registrationRoute';
import AdminRoutes from './routes/adminRoutes/adminRoutes';
import UserRoutes from './routes/userRoutes/userRoutes';
import ForgetAccount from './routes/forgetAccountRoute/forgetAccountRoute';

function App() {
  return (    
    <BrowserRouter>
      
      <UserRoutes />
      <RegistrationRoute />
      <ForgetAccount />
      <AdminRoutes />
      
    </BrowserRouter>
  );
}

export default App;