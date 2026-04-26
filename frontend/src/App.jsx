import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Home from './pages/Home';
import DetectIngredients from './pages/DetectIngredients';
import Filters from './pages/Filters';
import Loading from './pages/Loading';
import RecipeDetail from './pages/RecipeDetail';
import Substitution from './pages/Substitution';
import Explore from './pages/Explore';
import Reviews from './pages/Reviews';
import Profile from './pages/Profile';
import Saved from './pages/Saved';
import Layout from './components/Layout/TabBar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/detect" element={<DetectIngredients />} />
            <Route path="/filters" element={<Filters />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/substitute" element={<Substitution />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/reviews/:recipeId" element={<Reviews />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<Saved />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
