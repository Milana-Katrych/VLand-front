import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AddTrack from './components/AddTrack';
import RemoveTrack from './components/RemoveTrack';
import SearchTrack from './components/SearchTrack';
import SortTracks from './components/SortTracks';
import ShowTracks from './components/ShowTracks';
import ShowStatistics from './components/ShowStatistics';
import RewriteCollection from './components/RewriteCollection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>VLand</h1>
        <nav>
          <ul>
            <li><NavLink to="/add">Add track</NavLink></li>
            <li><NavLink to="/remove">Remove track</NavLink></li>
            <li><NavLink to="/search">Search track</NavLink></li>
            <li><NavLink to="/sort">Sort tracks</NavLink></li>
            <li><NavLink to="/rewrite">Rewrite collection</NavLink></li>
            <li><NavLink to="/show">Show tracks</NavLink></li>
            <li><NavLink to="/statistics">Statistics</NavLink></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add" element={<AddTrack />} />
          <Route path="/remove" element={<RemoveTrack />} />
          <Route path="/search" element={<SearchTrack />} />
          <Route path="/sort" element={<SortTracks />} />
          <Route path="/show" element={<ShowTracks />} />
          <Route path="/statistics" element={<ShowStatistics />} />
          <Route path="/rewrite" element={<RewriteCollection />} />
          <Route path="/" element={<ShowTracks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;