import { useEffect, useState } from 'react'
import './styles/request.css';
import RequestForm from './components/requestForm';
import RequestMap from './components/requestMap';
import ParcelDetails from './components/parcelDetails';
import axios from 'axios';
import { Shimmer } from 'react-shimmer'

const App = () => {
const [location, setLocation] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get user current location
    axios({
      method: "POST",
      url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      const { location: {lat, lng} } = response.data
      setLocation([lat, lng])
      setLoading(false)
    }).catch(error => {
      const { message } = error.response.data
      console.log(message);
    })
  }, [])

  return (
    <div>
      {loading ? 
      <Shimmer width="100%" height="100vh" /> :
      <div className="container_body">
        <RequestForm currentLocation={location}/>
        <RequestMap location={location} />
        <ParcelDetails />
      </div>
      }
    </div>
  );
}

export default App;
