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

const menu = new MmenuLight(document.querySelector('#addSymptom'), 'all');
var navigator = menu.navigation({
    selectedClass: 'Selected',
    slidingSubmenus: true,
    theme: 'light',
    title: 'Menu'
});
var offCanvasMenu = menu.offcanvas({
    position: 'left'
});

document.querySelector('a[href="#addSymptom"]')
    .addEventListener('click', evnt => {
        evnt.preventDefault();
        offCanvasMenu.open();
    });
// offCanvasMenu.open();
// offCanvasMenu.close();

// Age range slider
const range2 = document.getElementById('ageRangeValue');
const rangeV2 = document.getElementById('rangeAgeCount');

setValue = () => {
    const newValue = Number((range2.value - range2.min) * 100 / (range2.max - range2.min));
    const newPosition = 10 - (newValue * 0.2);
    rangeV2.innerHTML = `<span id="ageSlider">${range2.value}</span>`;
    rangeV2.style.left = `calc(${newValue}% + (${newPosition}px))`;
};
document.addEventListener("DOMContentLoaded", setValue);
range2.addEventListener('input', setValue);


function setSymptomData(id) {
    alert(id);
    localStorage.setItem('sympID', id);
    getSymptomData(id);
}

function getSymptomData(id) {
    $.getJSON("./js/SymptomsOutput.json", function(data) {
        $.each(data, function (key, val) {
            if(val.name == id) {
                
                var v = val.laytext;
                document.querySelector(".symptomName").innerHTML = v;
                
                if(val.choices != null) {
                    var output = '<select name="symptomResponse" id="symptomResponse" required="required">';
                    var count = 0;

                    $.each(val.choices, function() {
                            console.log(v);
                            output += '<option class="sympChoices">';
                            output += val.choices[count].text;
                            output += '</option>';
                            count++;
                    });

                    output += '</select>';
                    $('#symptomResponses').html(output);
                } else if (val.min >= 0) {
                    console.log(val.min);

                    var output = '<div class="range-value2" id="rangeV"></div><input type="range" class="form-range" id="age" name="age" ';
                    
                    output += 'min="' + val.min + '" max="'+ val.max + '"/>';
                    $('#symptomResponses').html(output);
                    const range = document.getElementById('age');
                    const rangeV = document.getElementById('rangeV');

                    setValue = () => {
                        const newValue = Number((range.value - range.min) * 100 / (range.max - range.min));
                        const newPosition = 10 - (newValue * 0.2);
                        rangeV.innerHTML = `<span id="numSlider">${range.value}</span>`;
                        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
                    };
                    document.addEventListener("DOMContentLoaded", setValue);
                    range.addEventListener('input', setValue);
                } else {
                    console.log("Choices doesnt exist!");
                }

            }
        });
    }); 
}



$(document).ready(function () {
    $(document).keyup(function () {
        if ($('#txt-search').val().length === 0) {
            $("#filter-records").hide();
        } else {
            $("#filter-records").show();
        }
    });

    $.getJSON("./js/SymptomsOutput.json", function(data) {
        console.log(data);
        $('#txt-search').keyup(function () {
            var searchField = $(this).val();
            if (searchField === '') {
                $('#filter-records').html('');
                return;
            }

            var regex = new RegExp(searchField, "i");
            var output = '<div class="search-row">';
            var count = 1;
            var sympID;
            $.each(data, function (key, val) {
                if (val.laytext.search(regex) != -1) {
                    sympID = val.name;
                    output += '<div class="searchQueries col-12">';
                    output += '<div id="' + sympID + '" onclick="setSymptomData(this.id)">' + val.laytext + '</div>'
                    output += '</div>';
                    count++;
                }               

            });
            output += '</div><span style="padding-bottom: 10px;"></span>';
            $('#filter-records').html(output);
        });

    }).fail(function () {
        console.log("An error has occurred.");
    });
});
