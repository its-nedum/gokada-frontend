import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

const RequestForm = ({handlePickup, handleDropoff, handleSubmit, 
                    handleFocus, handleUseMyLocation, showSuggestion, 
                    pickup, setPickup, dropoff, setDropoff, urLocation}) => {

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
                                    <input {...getInputProps()} type="text" onFocus={(e) => handleFocus(e)} className="form-control req_txtbox" value={pickup} placeholder="Pickup address" aria-label="pickup_address" />
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
                                    {showSuggestion? 
                                    <div className="showUserCurrentLocation" onClick={(e) => handleUseMyLocation(e)}>{urLocation}</div>
                                    : null }
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
