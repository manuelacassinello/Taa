


const menuSlide = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  // const menuSection = document.querySelector('.menu-section');
  // console.log(menuSection);
  const navUl = document.querySelector('nav ul');
  const offscreenNav = document.querySelector('.offscreen-nav');

  menuToggle.addEventListener('click', (event) => {
    console.log(event);
    menuToggle.classList.toggle('on');
    // menuSection.classList.toggle('on');
    navUl.classList.toggle('hidden');
    offscreenNav.classList.toggle('reveal-nav');
  });
}
export { menuSlide };





// $(“.menu-toggle”).on(‘click’, function () {
//   $(this).toggleClass(“on”);
//   $(‘.menu-section’).toggleClass(“on”);
//   $(“nav ul”).toggleClass(‘hidden’);
// });
// $(“.menu-toggle”).on(‘click’, function () {
//   $(“.offscreen-nav”).toggleClass(“reveal-nav”);
// });
