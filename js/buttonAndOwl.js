$(document).ready(function () {
    // кнопка поднятия 
    $(`#up`).on(`click`, function () {
        $('html,body').animate({
            scrollTop: 0
        }, 700)
        return false
    })
    //клик по элементам
    $('.link-menu').on('click', function () {
        let elementClick = $(this).attr("href")
        let destination = $(elementClick).offset().top
        $('html').animate({
            scrollTop: destination
        }, 1500)
        return false //preventDefault  по другому  
    })
    // спускание меню 
    let header = $('.logo-nav')
    let scrollPrev = 0
    $(window).scroll(function () {
        let scroled = $(window).scrollTop()
        if (scroled > 100 && scroled > scrollPrev) {
            header.addClass('out')
        } else {
            header.removeClass('out')
        }
        scrollPrev = scroled
    })
})

$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })
})