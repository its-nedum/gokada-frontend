import React, {useState} from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const RequestForm = () => {
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("")
    const [pickupcoordinate, setPickupcoordinate] = useState([]);
    const [dropoffcoordinate, setDropoffcoordinate] = useState([]);

    const handlePickup = (value) => {
        geocodeByAddress(value)
        .then(results => {
            getLatLng(results[0])
            .then(latlng => {
                setPickup(value);
                setPickupcoordinate([latlng.lat, latlng.lng])
            }).catch(error => console.log({'latlng': error}))
        }).catch(error => console.log({'geocodeError': error}))
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

    const handleFocus = () => {
        console.log('Focused')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form className="card pl-4 mb-1" onSubmit={handleSubmit}>
                        <h4 className="text-center">Parcel request</h4>
                        <div className="row input-group">
                            <div className="col-12 mb-2">
                            <PlacesAutocomplete value={pickup} onChange={setPickup} onSelect={handlePickup}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input {...getInputProps()} type="text" className="form-control req_txtbox" value={pickup} placeholder="Pickup address" aria-label="pickup_address" />
                                    <div className="autocomplete-dropdown mb-2 text-left pl-3">
                                        {loading ? <div>loading...</div> : null}
                                        {suggestions.map((suggestion, index) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#083E9E" : "#fff",
                                                color: suggestion.active ? "#fff" : "#083E9E",
                                                cursor: suggestion.active ? 'pointer' : 'pointer',
                                            };
                                            return <div {...getSuggestionItemProps(suggestion, { style })} key={index}>{suggestion.description}</div>
                                        })}
                                    </div>
                                </div>
                            )}   
                            </PlacesAutocomplete>
                            </div>
                        </div>
                        <div className="row input-group">
                            <div className="col-12 mb-2">
                            <PlacesAutocomplete value={dropoff} onChange={setDropoff} onSelect={handleDropoff}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                <input {...getInputProps()} type="text" className="form-control req_txtbox" placeholder="Dropoff address" aria-label="dropoff_address" />
                                    <div className="autocomplete-dropdown mb-2 text-left pl-3">
                                        {loading ? <div>loading...</div> : null}
                                        {suggestions.map((suggestion, index) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#083E9E" : "#fff",
                                                color: suggestion.active ? "#fff" : "#083E9E",
                                                cursor: suggestion.active ? 'pointer' : 'pointer',
                                            };
                                            return <div {...getSuggestionItemProps(suggestion, { style })} key={index}>{suggestion.description}</div>
                                        })}
                                    </div>
                                </div>
                            )}   
                            </PlacesAutocomplete>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RequestForm
