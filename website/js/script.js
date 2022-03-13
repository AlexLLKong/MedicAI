document.addEventListener("DOMContentLoaded", function(){
    // Opens hamburger menu
    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }
});

$(document).ready(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-custom");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

    // Adds navbar hamburger button animation
    $('.me-button').on('click', function () {
        $('.me-navbar-icon-animated').toggleClass('open');
    });
});