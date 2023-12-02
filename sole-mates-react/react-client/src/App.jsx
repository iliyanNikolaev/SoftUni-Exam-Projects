import { Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage.jsx';
import { CreatePage } from './pages/CreatePage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { DetailsPage } from './pages/DetailsPage.jsx';
import { EditPage } from './pages/EditPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';

import { Navigation } from './components/Navigation.jsx';
import { Footer } from './components/Footer.jsx';
import { LogoutAction } from './components/LogoutAction.jsx';
function App() {

  return (
    <>
    <Navigation />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/create' element={<CreatePage />}></Route>
        <Route path='/dashboard' element={<DashboardPage />}></Route>
        <Route path='/details/:id' element={<DetailsPage />}></Route>
        <Route path='/edit/:id' element={<EditPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/logout' element={<LogoutAction />}></Route>
      </Routes>

    <Footer />
    </>
  )
}

export default App
