import '../node_modules/owl.carousel/node_modules/jquery/dist/jquery.js';
let syper_url = 'https://api.sypexgeo.net';

// let CITIES_URL = CITIES;
let cities;

/**
 * 
 * @param {*} api_url //адрес запроса
 */

$.ajax({
    url: syper_url,
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




let file_api = (window.File && window.FileReader && window.FileList && window.Bloob) ? true : false; 
//смена надписи загрузки файла 
let inp = $('#file'),
    lbl = $('#file-label');

inp.on('change', function () {
    let filename;
    if (file_api) {
        filename = inp[0].files[0].name; // из массива полученого в инпуте 
    } else {
        filename = inp.val().replace("C:\\fakepath\\", ''); //замена на пустое значение 
    }
    // console.log(filename);
    if (!filename.length) return;
    lbl.html(filename);
})

$('.input-form').on('focus', function () {
    $(this).next('.input-required').remove();
    $(this).addClass('rightChoice')
})


$('.ajax-form').on('submit', function (e) {
    e.preventDefault();
    let form = document.forms.form_with_file,
    jqform = $(this);
    let hasValue = true;
    jqform.find('.input-form').each(function () {
        if (!$(this).val()) {
            $(this).after('<p class="input-required">Поле обязательно для заполнения</p>');
            hasValue = false;
        }
    });
    if (hasValue) {
        $('body').append('<div class="ajax-loader"></div>');
        //создаем данные формы 
        let formData = new FormData(form),
            //создаем соединение  и открываем его
            xhr = new XMLHttpRequest();
        xhr.open('POST', 'serv.php');
        setTimeout(function () {
            //обработка 
            xhr.onreadystatechange = function () {
                // файлы уже отправлены и запрос завершился успешно
                if (xhr.readyState == 4 && xhr.status == 200) {
                    $('.ajax-loader').remove();
                     let msg = $.parseJSON(xhr.responseText);
                    if (msg.error_name) {
                        console.log(msg.error_name)
                    }
                }
            }
        }, 5);
        xhr.send(formData);
    }
})