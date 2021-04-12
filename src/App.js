import { useEffect, useState } from 'react'
import './styles/request.css';
import RequestForm from './components/requestForm';
import RequestMap from './components/requestMap'
import axios from 'axios';

const App = () => {
const [location, setLocation] = useState([9.117, 8.674]);
const [place, setPlace] = useState("")

  useEffect(() => {
    // get user current location
    axios({
      method: "POST",
      url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      const { location } = response.data
      console.log(response.data)
      // destruction location into an array then pass it to the useState
      setLocation(location)
      setPlace("")
    }).catch(error => {
      const { message } = error.response.data
      console.log(message);
    })
  }, [])

  return (
    <div className="container_body">
      <RequestForm place={place} />
      <RequestMap location={location} />
    </div>
  );
}

export default App;
