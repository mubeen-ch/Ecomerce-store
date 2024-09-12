import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './Components/Home/Home.jsx'; 
import Navbar from './Components/Navbar/Navbar'; 
import Footer from './Components/Footer/Footer'; 
import ItemDetails from './Components/Card/CardItem.jsx'; 


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
              <Home /> 
          }
        />
        <Route path="/item/:id" element={<ItemDetails />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;







// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import AuthForm from '';
// import Home from './Components/Home/Home.jsx';
// import Navbar from './Components/Navbar/Navbar.jsx';
// import Footer from './Components/Footer/Footer.jsx';
// import ProtectedRoute from './Routes/ProtectedRoute';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" />} />
//         <Route path="/signup" element={<AuthForm action="signup" />} />
//         <Route path="/login" element={<AuthForm action="login" />} />
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;
