import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import {useState} from "react";

const MapEvents = ( {onClick, setPosition} ) =>{
  useMapEvents({
    click(event){
      onClick?.(event)
      setPosition({lat: event.latlng.lat, lng: event.latlng.lng})
    }
  })
  return null;
}

export const Map = ( {onClick} ) => {
  const [position, setPosition] = useState({lat:-39.8139, lng: -73.2458})
  return (
    <MapContainer
      center={[-39.8139, -73.2458]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "800px", width: "100%" }}
    >
    <MapEvents onClick={onClick} setPosition={setPosition}/>
      <TileLayer url="https://api.mapbox.com/styles/v1/mvernier/ckp75i4sw396418n6gbb4psz0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibXZlcm5pZXIiLCJhIjoiY2twNzRxeTJzMDQycTJvbzA5N2NyN283biJ9.nMykNl6xWvMe8MV8DLH-ig" />
    <Marker position= { position } />
    </MapContainer>
  );
};
