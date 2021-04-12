import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const RequestMap = ({location}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                <MapContainer center={location} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={location}>
                        <Popup>
                        Your location
                        </Popup>
                    </Marker>
                    <Marker position={[9.1099, 7.4042]}>
                        <Popup>
                        Your Dropoff
                        </Popup>
                    </Marker>
                </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default RequestMap
