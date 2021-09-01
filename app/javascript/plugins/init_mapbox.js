import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';



const initMapbox = () => {
  const mapElement = document.getElementById('map');



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

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0aGplb25nIiwiYSI6ImNrczI3djFjbjIxOXMycXM3aXpwZXJyZWEifQ.1w9UEC3UTR9FhyYOrTQwGg'

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken
      }),
      'top-left'
      );


    const instructions = document.getElementById('instructions');
    const steps = data.legs[0].steps;

    let tripInstructions = '';
    for (const step of steps) {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    }
    instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
      data.duration / 60
    )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;

  }
};

export { initMapbox };
