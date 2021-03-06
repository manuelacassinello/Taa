// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require('jquery')


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';
import { initMapbox } from './../plugins/init_mapbox';
import { menuSlide } from "./../plugins/menu";
import { initAutocomplete } from "./../plugins/init_autocomplete";
import { getCurrentLocation } from './../plugins/geolocation';




document.addEventListener('turbolinks:load', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  getCurrentLocation();
  // const splashImg = document.querySelector(".splash-img");
  // if (splashImg) {
  //   setTimeout(() => {
  //     splashImg.style.opacity = 0;
  //   }, 2000);
  //   setTimeout(() => {
  //     splashImg.classList.add("d-none");
  //   }, 3000);
  // }

  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  menuSlide();
  initAutocomplete();
  initMapbox();
})
