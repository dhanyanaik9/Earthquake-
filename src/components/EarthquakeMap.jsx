import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const EarthquakeMap = () => {
  const [earthquakes, setEarthquakes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        )
        const data = await response.json()
        setEarthquakes(data.features)
      } catch (error) {
        console.error('Error fetching earthquake data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="map-wrapper">
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {earthquakes.map((eq) => {
          const [lon, lat, depth] = eq.geometry.coordinates
          const magnitude = eq.properties.mag
          const color = magnitude > 5 ? 'red' : magnitude > 3 ? 'orange' : 'yellow'

          return (
            <CircleMarker
              key={eq.id}
              center={[lat, lon]}
              radius={magnitude * 2}
              color={color}
              fillOpacity={0.7}
            >
              <Popup>
                <strong>{eq.properties.place}</strong><br />
                Magnitude: {magnitude}<br />
                Depth: {depth} km<br />
                Time: {new Date(eq.properties.time).toLocaleString()}
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default EarthquakeMap
