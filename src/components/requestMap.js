import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

const RequestMap = ({location, dropoffcoordinate, pickupLocation}) => {

    // polyline parameters
    const path = { color: 'red'};
    const position = [location,dropoffcoordinate];

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
                    <>
                    <Marker position={dropoffcoordinate}>
                        <Popup>
                        Dropoff
                        </Popup>
                    </Marker>
                    <Polyline pathOptions={path} positions={position} />
                    </>
                    : null}
                </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default RequestMap
