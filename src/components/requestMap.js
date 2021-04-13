import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const RequestMap = ({location, dropoffcoordinate, pickupLocation}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                <MapContainer center={location} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={location}>
                        <Popup>
                         {pickupLocation? "Pickup" : "Your location"}
                        </Popup>
                    </Marker>
                    {dropoffcoordinate.length !== 0?
                    <Marker position={dropoffcoordinate}>
                        <Popup>
                        Dropoff
                        </Popup>
                    </Marker>
                    : null}
                </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default RequestMap
