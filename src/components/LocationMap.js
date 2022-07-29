import { MapContainer, Marker, TileLayer } from "react-leaflet"

import { Icon } from "leaflet"
import { Paper } from "@mui/material"
import React from "react"
import logoPin from "../images/logopin.png"

export default function LocationMap() {
  const latitude = 28.609654
  const longitude = -13.92936
  return typeof window !== "undefined" ? (
    <Paper elevation={3}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{
          height: "25rem",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[latitude, longitude]}
          icon={
            new Icon({
              iconUrl: logoPin,
              iconAnchor: [20, 80],
            })
          }
        />
      </MapContainer>
    </Paper>
  ) : null
}
