import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { csrfToken } from "@rails/ujs";



const initMapbox = () => {
  const mapElement = document.getElementById('map');
  const simpleMap = document.getElementById('simple');
  const homeMap = document.getElementById('home-map');
  const itinerary = document.querySelector('.itinerary-id')
  if (itinerary) {
    const id_itinerary = itinerary.id
  }

  if (homeMap) {
    mapboxgl.accessToken = homeMap.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'home-map',
      style: 'mapbox://styles/manuelacass/ckt8lvgp552uj17mwmogl2x47'
    });
  }

  if (simpleMap) {
    mapboxgl.accessToken = simpleMap.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'simple',
      style: 'mapbox://styles/manuelacass/ckt8lvgp552uj17mwmogl2x47'
    });

    const fitMapToMarkers = (map, markers) => {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(marker => bounds.extend([marker.long, marker.lat]));
      map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
    };

    const markers = JSON.parse(simpleMap.dataset.markers);

    markers.forEach((marker) => {

      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '25px';
      element.style.height = '25px';


      new mapboxgl.Marker()
        .setLngLat([marker.long, marker.lat])
        .addTo(map);
    });

    fitMapToMarkers(map, markers);
    // const start = [markers[0].long, markers[0].lat];
    // const end = [markers[1].long, markers[1].lat];
    // mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0aGplb25nIiwiYSI6ImNrczI3djFjbjIxOXMycXM3aXpwZXJyZWEifQ.1w9UEC3UTR9FhyYOrTQwGg'
  }




  if (mapElement) { // only build a map if there's a div#map to inject into
    const id_journey = document.querySelector('.journey-id').id

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/manuelacass/ckt8lvgp552uj17mwmogl2x47'
    });

    const fitMapToMarkers = (map, markers) => {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(marker => bounds.extend([marker.long, marker.lat]));
      map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
    };


    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([marker.long, marker.lat])
        .addTo(map);
    });

    fitMapToMarkers(map, markers);
    const start = [markers[0].long, markers[0].lat];
    const end = [markers[1].long, markers[1].lat];
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0aGplb25nIiwiYSI6ImNrczI3djFjbjIxOXMycXM3aXpwZXJyZWEifQ.1w9UEC3UTR9FhyYOrTQwGg'

    async function getRoute(transportMethod) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      console.log(mapElement.dataset.url)
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${transportMethod}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
      );
      const json = await query.json();
      const data = json.routes[0];
      const distance = data.distance;
      const duration = data.duration;
      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
      // if the route already exists on the map, we'll reset it using setData
      if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#000000',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }
      // add turn instructions here at the end
      const instructions = document.getElementById('instructions');
      const steps = data.legs[0].steps;
      console.log(data, steps);

      let tripInstructions = '';
      for (const step of steps) {
        tripInstructions += `<li >${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `<div><p style="position: revert !important;"><strong>Trip duration: ${Math.floor(
        data.duration / 60
      )} min </strong></p><ol>${tripInstructions}</ol></div>`;

      const field = {journey: { distance: distance, duration: duration, transportation: transportMethod } };
      const itinerary = document.querySelector('.itinerary-id');
      if (itinerary) {
        const id_itinerary = itinerary.id;
        fetch(`/itineraries/${id_itinerary}/journeys`, {
          method: 'POST', // or 'PUT'
          headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken(), 'Content-Type': 'application/json'},
          body: JSON.stringify(field),
        })
        .then(response => response.json())
        .then(field => {
          console.log('Success:', field);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    }
    map.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location



      // Add starting point to the map
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: start
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 1,
          'circle-color': '#000000'
        }
      });
      // this is where the code from the next step will go
      map.addLayer({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: end
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 1,
          'circle-color': '#000000'
        }
      });

      const journeyWrapper = document.querySelector('.journey-show');
      if (journeyWrapper) {
        const transportationMethod = journeyWrapper.dataset.transportationMethod;
        getRoute(transportationMethod);
      }
    });
  }
};

export { initMapbox };
