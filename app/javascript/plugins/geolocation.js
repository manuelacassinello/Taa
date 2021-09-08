const itineraryNew = document.querySelector('#itinerary_origin_destination');
const hint = document.querySelector('#hint');

const getCurrentLocation = () => {
  navigator.permissions.query({ name: 'geolocation' })
    .then((event) => {
      hint.innerHTML = 'Fetching your location...'
    });
  if (itineraryNew) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function success(event) {
  const [lat, long] = [event.coords.latitude, event.coords.longitude]
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=poi&access_token=pk.eyJ1Ijoici1tYW5ldCIsImEiOiJja3MwZWFhYzMxajNiMm9uODd3bjEyNG9hIn0.6nTpGUZOR4UtTQ6HeygHPg`)
    .then(response => response.json())
    .then((data) => {
      itineraryNew.value = `${data.features[0].context[1].text}, ${data.features[0].context[0].text}, ${data.features[0].context.slice(2, 4).map(feature => feature.text).join(', ')}`;
      console.log(`${data.features[0].context[1].text}, ${data.features[0].context[0].text}, ${data.features[0].context.slice(2, 4).map(feature => feature.text).join(', ')}`)
      hint.innerHTML = '';
    })
}

function error(event) {
  console.error(event);
}

export { getCurrentLocation };
