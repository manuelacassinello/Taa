$(".menu-toggle").on('click', function() {
        $(this).toggleClass("on");
        $('.menu-section').toggleClass("on");
        $("nav ul").toggleClass('hidden');
      });

      $(".list").on('click', function() {
        $(this).toggleClass("on");
        $('.menu-section').toggleClass("on");
        $('.menu-toggle').toggleClass("on");
        $("nav ul").toggleClass('hidden');

      });
