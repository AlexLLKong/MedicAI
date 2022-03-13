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

    $('.me-terms-check:checkbox').change(function(){
        if($(this).is(":checked")) {
            $('.me-terms-btn .me-btn-primary').removeClass("me-disabled");
            $(".me-terms-btn .me-btn-primary").attr("href", "./home.html")
        } else {
            $('.me-terms-btn .me-btn-primary').addClass("me-disabled");
            $(".me-terms-btn .me-btn-primary").attr("href", "")
        }
    });
});

// When the user clicks on decline button, open the popup
function openPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}