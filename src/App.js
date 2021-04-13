import { useEffect, useState } from 'react'
import './styles/request.css';
import RequestForm from './components/requestForm';
import RequestMap from './components/requestMap';
import ParcelDetails from './components/parcelDetails';
import axios from 'axios';
import { Shimmer } from 'react-shimmer'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const App = () => {
const [location, setLocation] = useState([]);
const [loading, setLoading] = useState(true);
const [urLocation, setUrlocation] = useState("");
const [urLocationLatLng, setUrLocationLatLng] = useState([])
const [pickup, setPickup] = useState("");
const [dropoff, setDropoff] = useState("")
const [pickupcoordinate, setPickupcoordinate] = useState([]);
const [dropoffcoordinate, setDropoffcoordinate] = useState([]);
const [showSuggestion, setShowsuggestion] = useState(false);

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

    const handlePickup = (value) => {
        geocodeByAddress(value)
        .then(results => {
            getLatLng(results[0])
            .then(latlng => {
                setPickup(value);
                setLocation([latlng.lat, latlng.lng])
                setPickupcoordinate([latlng.lat, latlng.lng])
            }).catch(error => console.log({'latlng': error}))
        }).catch(error => console.log({'geocodeError': error}))

        // clear location suggestion
        setShowsuggestion(false)
    }

    const handleDropoff = (value) => {
        geocodeByAddress(value)
        .then(results => {
            getLatLng(results[0])
            .then(latlng => {
                setDropoff(value);
                setDropoffcoordinate([latlng.lat, latlng.lng])
            }).catch(error => console.log({'latlng': error}))
        }).catch(error => console.log({'geocodeError': error}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(pickup && dropoff && pickupcoordinate && dropoffcoordinate) {
            // do something nice
        }else {
            console.log('error')
        }
    }

    const handleFocus = (e) => {
        e.preventDefault();
        setShowsuggestion(true)
    }

    const handleUseMyLocation = (e) => {
        e.preventDefault();
        // show the user their current location
        setPickup(urLocation)
        setShowsuggestion(false)
        console.log(urLocationLatLng)
    }

    useEffect(() => {
      if (location.length !== 0) {
        axios(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location[0]},${location[1]}&sensor=false&key=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            const { data: { results } } = response;
            // get the user current address using geocode
            setUrlocation(results[0].formatted_address);
            // destruction the user lat and lng depending on the result from google api
            const urLatlng = results[0].geometry.location;
            setUrLocationLatLng([urLatlng.lat, urLatlng.lng])
        })
        .catch(error => console.log(error))
      }
    },[location])

  return (
    <div>
      {loading ? 
      <Shimmer width="100%" height="100vh" /> :
      <div className="container_body">
        <RequestForm handlePickup={handlePickup} handleDropoff={handleDropoff}
        handleSubmit={handleSubmit} handleFocus={handleFocus} handleUseMyLocation={handleUseMyLocation}
        showSuggestion={showSuggestion} pickup={pickup} setPickup={setPickup} dropoff={dropoff} setDropoff={setDropoff}
        urLocation={urLocation}/>
        <RequestMap location={location} dropoffcoordinate={dropoffcoordinate} pickupLocation={pickup} />
        <ParcelDetails />
      </div>
      }
    </div>
  );
}

export default App;
