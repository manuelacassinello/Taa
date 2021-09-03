import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { csrfToken } from "@rails/ujs";



const initMapbox = () => {
  const mapElement = document.getElementById('map');

  const id = document.querySelector('.itinerary-id').id

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    const fitMapToMarkers = (map, markers) => {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(marker => bounds.extend([marker.long, marker.lat]));
      map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
    };


    const markers = JSON.parse(mapElement.dataset.markers);
    console.log(typeof(markers))
    markers.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([marker.long, marker.lat])
        .addTo(map);
    });

    fitMapToMarkers(map, markers);
    const start = [markers[0].long, markers[0].lat];
    console.log(markers[0])
    const end = [markers[1].long, markers[1].lat];
    console.log(end)
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0aGplb25nIiwiYSI6ImNrczI3djFjbjIxOXMycXM3aXpwZXJyZWEifQ.1w9UEC3UTR9FhyYOrTQwGg'

    // map.addControl(
    //   new MapboxDirections({
    //     accessToken: mapboxgl.accessToken
    //   }),
    //   'top-left'
    //   );

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
      console.log(distance);
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
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }
      // add turn instructions here at the end
      const instructions = document.getElementById('instructions');
      const steps = data.legs[0].steps;

      let tripInstructions = '';
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
      )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;

      const field = {journey: { distance: distance, duration: duration, transportation: transportMethod } };

      fetch(`/itineraries/${id}/journeys`, {
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
          'circle-radius': 10,
          'circle-color': '#3887be'
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
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });
      const transportMethods = ['cycling', 'walking', 'driving'];

      transportMethods.forEach(method => {
        getRoute(method);
      });
    });

  }
};

export { initMapbox };
