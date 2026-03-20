import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RouteSeo from './components/RouteSeo'
import Home from './pages/Home'
import Salon from './pages/Salon'
import ServiceDetail from './pages/ServiceDetail'
import Technology from './pages/Technology'
import Offers from './pages/Offers'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <RouteSeo />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="salon" element={<Salon />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
          <Route path="technology" element={<Technology />} />
          <Route path="offers" element={<Offers />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
