/* Nav menu overlay */
function openNav() {
    document.getElementById("overlay-menu").style.width = "100%";
}
  
function closeNav() {
    document.getElementById("overlay-menu").style.width = "0%";
}

/* Nav menu scroll effect Homepage */
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= $("#header").height()) {
        $("header").addClass("scrolling");
    } else {
        $("header").removeClass("scrolling");
    }
});


/* Portfolio page photos overlay */
$(document).ready( function() {

    $('.photos-item').hover( function() {
        $(this).find('.img-title').fadeIn(300);
    }, function() {
        $(this).find('.img-title').fadeOut(100);
    });
    
});

/* Portfolio page category filter */
$(function() {
    var $container = $('#photos'),
        $select = $('div#filters select');
    filters = {};

    $container.isotope({
        itemSelector: '.photos-item'
    });
        $select.change(function() {
        var $this = $(this);

        var $optionSet = $this;
        var group = $optionSet.attr('data-filter-group');
    filters[group] = $this.find('option:selected').attr('data-filter-value');

        var isoFilters = [];
        for (var prop in filters) {
            isoFilters.push(filters[prop])
        }
        var selector = isoFilters.join('');

        $container.isotope({
            filter: selector
        });

        return false;
    });
});

function validateForm() {
    document.getElementById('status').innerHTML = "Sending...";
    formData = {
        'name': $('input[name=name]').val(),
        'email': $('input[name=email]').val(),
        'subject': $('input[name=subject]').val(),
        'message': $('textarea[name=message]').val()
    };
    
    
    $.ajax({
        url: "mail.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
    
            $('#status').text(data.message);
            if (data.code)
                $('#contact-form').closest('form').find("input[type=text], textarea").val("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#status').text(jqXHR);
        }
    });
}
