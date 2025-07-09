"use client"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapComponent() {
  return (
    <MapContainer
      center={[39.8283, -98.5795]} // Center of the US
      zoom={4}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '240px', borderRadius: '12px' }}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      keyboard={false}
      touchZoom={false}
      boxZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* Example marker, remove or replace as needed */}
      {/* <Marker position={[39.8283, -98.5795]}>
        <Popup>
          This Marker icon is displayed correctly with <i>leaflet-defaulticon-compatibility</i>.
        </Popup>
      </Marker> */}
      {/* Pins/Markers will go here in the future */}
    </MapContainer>
  )
} 