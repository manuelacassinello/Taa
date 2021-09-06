import places from 'places.js';

const initAutocomplete = () => {
  const addressInputs = document.querySelectorAll('.address-input');
  addressInputs.forEach((input) => {
    places({ container: input });
  })

};

export { initAutocomplete };
