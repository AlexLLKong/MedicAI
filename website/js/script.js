document.addEventListener("DOMContentLoaded", function () {
    // Opens hamburger menu
    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }
    $('#analyzeSympBtn').attr('disabled', 'disabled');
});

$(document).ready(function () {
    if (!localStorage.SessionID) {
        console.log("No session id in local storage");
        fetch("/init")
            .then(response => response.json())
            .then(jsonData => {

                localStorage.setItem("SessionID", jsonData.SessionID);
            })
    } else {
        fetch("/acceptTerms", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SessionID: localStorage.SessionID
            })
        })
            .then(response => response.json())
            .then(jsonData => console.log(jsonData))
    }
    $(document).scroll(function () {
        var $nav = $(".navbar-custom");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

    // Adds navbar hamburger button animation
    $('.me-button').on('click', function () {
        $('.me-navbar-icon-animated').toggleClass('open');
    });

    $('.me-terms-check:checkbox').change(function () {
        if ($(this).is(":checked")) {
            $('.me-terms-btn .me-btn-primary').removeClass("me-disabled");
            $(".me-terms-btn .me-btn-primary").attr("href", "/html/home.html")
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
    setUserResponse(id);
    createSymptomTemplate(id);
}

function analyzeResults() {
    
}

function setUserResponse(id) {
    $.getJSON("./js/SymptomsOutput.json", function (data) {
        $.each(data, function (key, val) {
            if (val.name == id) {
                var x = $('.nextStep').attr('value', 'Add Symptoms');
                if (val.min >= 0) {
                    $(x).click(function () {
                        var userChoice = document.getElementById("numSlider").innerHTML;
                        localStorage.setItem('sympChoiceSlider', userChoice);
                    });

                } else {
                    $(x).click(function () {
                        var userChoiceDrop = document.getElementById("symptomResponse").value;
                        localStorage.setItem('sympChoiceDrop', userChoiceDrop);
                    });
                }
            }
        });
    });
}

function createSymptomTemplate(id) {
    $.getJSON("./js/SymptomsOutput.json", function (data) {
        var output;
        $.each(data, function (key, val) {
            if (val.name == id) {
                output = '<div class="me-symptom"><div class="me-symptom-name">' + val.laytext;
                output += '<span class="me-symptom-response"><span class="me-symptom-response"style="font-weight:600;">(';

                if (val.min >= 0) {
                    output += localStorage.getItem('sympChoiceSlider');

                } else {
                    output += localStorage.getItem('sympChoiceDrop');
                }

                output += ')</span></div><div class="me-symptom-btns"><a class="btn me-btn-primary" href="#" role="button">Edit</a><a class="btn me-btn-secondary" href="#" role="button">Delete</a></div>';
            }
        });

        $('.me-symptoms').html(output);
    });
}


function getSymptomData(id) {
    $.getJSON("./js/SymptomsOutput.json", function (data) {
        $.each(data, function (key, val) {
            if (val.name == id) {

                var v = val.laytext;
                document.querySelector(".symptomName").innerHTML = v;

                if (val.choices != null) {
                    var output = '<select name="symptomResponse" id="symptomResponse" required="required">';
                    var count = 0;

                    $.each(val.choices, function () {
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

                    output += 'min="' + val.min + '" max="' + val.max + '"/>';
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

                var x = $('.nextStep').attr('value', 'Add Symptoms');
                if (val.min >= 0) {
                    $(x).click(function () {
                        var userChoice = document.getElementById("numSlider").innerHTML;
                        localStorage.setItem('sympChoiceSlider', userChoice);
                    });

                } else {
                    $(x).click(function () {
                        var userChoiceDrop = document.getElementById("symptomResponse").value;
                        localStorage.setItem('sympChoiceDrop', userChoiceDrop);
                    });
                }
            }
        });
    });
}



$(document).ready(function () {
    var length = $("section").length - 1;
    var child = 1;

    $("section").not("section:nth-of-type(1)").hide();
    $("section").not("section:nth-of-type(1)").css('transform', 'translateX(100px)');

    $(".nextStep").click(function () {
        var id = $(this).attr("id");

        if (id == "next") {
            if (child <= length) {
                child++;
                console.log(child);
                if (child == 3) {
                    $(this).prop("value", "Add Symptom");
                    // $(this).click(offCanvasMenu.close())
                    // child = 1;
                }
            }
        }
        var currentSection = $("section:nth-of-type(" + child + ")");
        currentSection.fadeIn();
        currentSection.css('transform', 'translateX(0)');
        currentSection.prevAll('section').css('transform', 'translateX(-100px)');
        currentSection.nextAll('section').css('transform', 'translateX(100px)');

        $('section').not(currentSection).hide();
    });

    $(document).keyup(function () {
        if ($('#txt-search').val().length === 0) {
            $("#filter-records").hide();
        } else {
            $("#filter-records").show();
        }
    });

    $.getJSON("./js/SymptomsOutput.json", function (data) {
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
