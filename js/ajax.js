import '../node_modules/owl.carousel/node_modules/jquery/dist/jquery.js';
let syper_url = 'https://api.sypexgeo.net';

// let CITIES_URL = CITIES;
let cities;

/**
 * 
 * @param {*} api_url //адрес запроса
 */

$.ajax({
    url: syper_url ,
    dataType: "json",
    error: function () {
        $('#modal_city').show(500)
    },
    success: function (data) {
        let city = data.city.name_ru
        $(`#city_name`).html(city)
        $.ajax({
            url: `http://glavpunkt.ru/api/get_tarif?serv=выдача&cityFrom=Санкт-Петербург&cityTo=${city}`,
            success: function (data) {
                // console.log(data.tarif)
                // console.log(data.cityTo)
            }
        })
    }
})
$.ajax({
    url: 'http://glavpunkt.ru/api/get_rf_cities',
    success: function (data) {
        cities = data
    }
})
jQuery(($) => {

    $(`#closeModalCity`).on(`click`, function (e) {
        $('#modal_city').hide(500)
    })
    $(`#city_name`).on(`click`, function (e) {
        e.preventDefault();
        $('#modal_city').show(500)
    })
})

jQuery(document).ready(($) => {


    $('body').on('input keyup', 'input[name=city_choose]', function () {
        let search = $(this).val();
        let count = 0;
        let html = '<ul>';
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name.toLowerCase().indexOf(search.toLowerCase()) >= 0 && count <= 4) {
                html += '<li data-city="' + cities[i].name + '">' + cities[i].name + ' (' + cities[i].area + ')</li>'
                //Казань (Татарстан) 
                count++;

            }
        }
        html += '</ul>';
        $('#result').html(html);

    });
    $('body').on('click', '#result li', function () {
        let choice = $(this).data('city')
        $('#city_name').html($(this).data('city'))
        $('#modal_city').hide(500)
        $.ajax({
            url: `http://glavpunkt.ru/api/get_tarif?serv=выдача&cityFrom=Санкт-Петербург&cityTo=${choice}`,
            success: function (data) {
                //    console.log(data.tarif)
                //    console.log(data.cityTo)
            }
        })
    })
})


$('.input-required').on('focus', function () {
    $(this).next('.input-error').remove();
})


$('.checkbox-required').on('focus', function () {
    $(this).next('.input-error').remove();
})




let file_api = (window.File && window.FileReader && window.FileList && window.Bloob) ? true : false; //?????
    //смена надписи загрузки файла 
   let inp = $('#file'),
    lbl = $('#file-label');

    inp.on('change', function () {
        let filename;
        if (file_api) {
            filename = inp[0].files[0].name; // из массива полученого в инпуте ?????
        } else {
            filename = inp.val().replace("C:\\fakepath\\", ''); //замена на пустое значение ???
        }
        console.log(filename);
        if (!filename.length) return;
        lbl.html(filename);
    })




$('.ajax-form').on('submit', function (e) {
    e.preventDefault();
    let form = document.forms.form_with_file,
    jqform = $(this),
        hasValue = true;
        //data = form.serialize();
    jqform.find('.input-form').each(function () {
        if (!$(this).val()) {
            $(this).after('<p class="input-required">Поле обязательно для заполнения</p>');
            hasValue = false;

        }
    });
    if (hasValue) {
        $('body').append('<div class="ajax-loader"></div>');
      
        //создаем данные формы 
        let formData = new FormData(form), // FormData???
         //создаем соединение  и открываем его
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'serv.php');
            setTimeout(function () {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState==4 && xhr.status ==200){
                        $('.ajax-loader').remove();
                        console.log(xhr.responseText);
                    msg = $.parseJSON(xhr.responseText);//???
                    if(msg.error_name){
                        console.log(msg.error_name);
                    }
                    } else {
                    // <?php  
                    //     $dataServer = date('d M Y H:i:s');
                    //     $browser = $_SERVER["HTTP_USER_AGENT"];
                    //     sendErrorServer($client,$dataServer,$browser);
                    // ?>
                    }
                }
            },5);
            xhr.send(formData);
        // $.ajax({
        //     url: 'serv.php',
        //     data: data,
        //     method: 'post',
        //     dataType: 'json',
        //     success: function (msg) {
        //         $('.ajax-loader').remove();
        //         if (msg.name) {
                    
        //             console.log(msg.name)
        //         }
        //     },
        //     error: function (msg) {
        //         $('.ajax-loader').remove();
        //         console.log(msg)
        //     }
        // })
    }
})



// $('.ajax-form').on('submit', function (e) {
//     e.preventDefault();
//     let form = $(this),
//         data = form.serialize(); //для того чтобы подготовить форму к отправке,она записывается как единый обьект 
//         filled = true; // заполнены ли поля или нет

//     form.find('.input-required').each(function () {
//         if (!$(this).val()) {
//             $(this).after('<p class="input-error">Ошибка.Поле обязательно для заполения</p>')
//             filled = false;
//         }
//     });

//     form.find('.checkbox-required').each(function () {
//         if (!$(this).is(':checked')) {
//             $(this).after('<p class="input-error">Ошибка.Поле обязательно для заполения</p>')
//             filled = false;
//         }
//     });

//     if (filled) {
//         $.ajax({
//             url: 'serv.php',
//             data: data,
//             method: 'post',
//             dataType: 'json',
//             success: function (msg) { ///msg???
//                 console.log(msg);
//             },
//             error: function (msg) {
//                 alert('Отправка не удалась. Ошибка :' + msg)
//             }
//         })
//     }
// })


        $(document).ready(function() {
            // кнопка поднятия 
            $(`#up`).on(`click`, function() {
                $('html,body').animate({
                    scrollTop: 0
                }, 700)
                return false
            })
            //клик по элементам
            $('.link-menu').on('click', function() {
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
            $(window).scroll(function() {
                let scroled = $(window).scrollTop()
                if (scroled > 100 && scroled > scrollPrev) {
                    header.addClass('out')
                } else {
                    header.removeClass('out')
                }
                scrollPrev = scroled
            })
        })



        $(document).ready(function() {
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
