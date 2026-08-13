import { HashRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import SparkleField from './components/SparkleField';
import Dashboard from './screens/Dashboard';
import ItineraryList from './screens/ItineraryList';
import DayDetail from './screens/DayDetail';
import EpcotChallenge from './screens/EpcotChallenge';
import MapScreen from './screens/MapScreen';
import Notifications from './screens/Notifications';
import MoreHub from './screens/MoreHub';
import Characters from './screens/Characters';
import Shows from './screens/Shows';
import TikTokIdeas from './screens/TikTokIdeas';
import InstagramIdeas from './screens/InstagramIdeas';
import PhotoBoard from './screens/PhotoBoard';
import PersonalizationShop from './screens/PersonalizationShop';
import BirthdaySpecial from './screens/BirthdaySpecial';
import Family from './screens/Family';
import Settings from './screens/Settings';

export default function App() {
  return (
    <HashRouter>
      <SparkleField />
      <div className="min-h-[100svh] pb-16 relative z-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/itinerario" element={<ItineraryList />} />
          <Route path="/itinerario/:date" element={<DayDetail />} />
          <Route path="/epcot" element={<EpcotChallenge />} />
          <Route path="/mapa" element={<MapScreen />} />
          <Route path="/alertas" element={<Notifications />} />
          <Route path="/mas" element={<MoreHub />} />
          <Route path="/personajes" element={<Characters />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/tiktok" element={<TikTokIdeas />} />
          <Route path="/instagram" element={<InstagramIdeas />} />
          <Route path="/fotos" element={<PhotoBoard />} />
          <Route path="/tienda" element={<PersonalizationShop />} />
          <Route path="/cumpleanos/:id" element={<BirthdaySpecial />} />
          <Route path="/familia" element={<Family />} />
          <Route path="/ajustes" element={<Settings />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  );
}
