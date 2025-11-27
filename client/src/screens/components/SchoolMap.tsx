import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// --- REPLACE WITH YOUR MAPBOX TOKEN ---
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2hlbXV1dSIsImEiOiJjbWlmdHZ5NWowMTYxM2Rvdzg0MDAwNmVvIn0.CVWGcGGMjGfjiID_wGcvbg'; 

const SchoolMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Inject CSS styles
  useEffect(() => {
    if (!document.getElementById('school-map-css')) {
      const style = document.createElement('style');
      style.id = 'school-map-css';
      style.textContent = CSS;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    // 1. Initialize the Map with Standard Style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // The new Standard style enables 3D lights and shadows by default
      style: 'mapbox://styles/mapbox/standard', 
      center: [122.5656, 10.7025], // Coordinates for Assumption Iloilo
      zoom: 17.5, 
      pitch: 60, // Tilted for 3D effect
      bearing: -20, // Rotated to show the front
      antialias: true,
      config: {
        basemap: {
          // 'showPointOfInterestLabels': false // Optional: hide generic labels
        }
      }
    });

    // 2. Add Navigation Controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // 3. Add the Custom Marker
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker(el)
      .setLngLat([122.5656, 10.7025])
      .setPopup(
        new mapboxgl.Popup({ offset: 35 })
          .setHTML('<h3 style="color:#1f1d28;font-weight:bold;margin:0;">Assumption Iloilo</h3><p style="margin:5px 0 0;">18 Gen. Luna St., Iloilo City</p>')
      )
      .addTo(map.current);

    // 4. Resize map to fit container properly
    map.current.on('load', () => {
      if (map.current) {
        map.current.resize();
      }
    });

    // 5. Handle window resize for fullscreen mode
    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="school-map-wrapper">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

const CSS = `
.school-map-wrapper {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 4px solid #1f1d28;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* Tablet styles (768px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .school-map-wrapper {
    min-height: 480px;
    max-height: 480px;
  }
}

@media (min-width: 768px) {
  .school-map-wrapper {
    min-height: 450px;
  }
}

@media (min-width: 1024px) {
  .school-map-wrapper {
    min-height: 500px;
    max-height: 500px;
  }
}

.map-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* Custom Marker Style */
.marker {
  background-image: url('/assets/images/assumption-logo.png');
  background-size: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid #f3d654;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  background-color: white; /* Fallback if image fails */
}
`;

export default SchoolMap;