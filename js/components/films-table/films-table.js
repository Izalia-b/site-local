// import {films} from '../__data__/constants/films.js';
import {ganars} from './constants.js';
export default class FilmsTable {
    films = [];
    elementId='';
    constructor (films,elementId='filmsHire'){
        this.films = films;
        this.elementId = elementId;
    }
    
    render() {
        // Заполнение фильмов в таблицу
        const links = document.getElementById(`links`)
    
        //  Заполнение таблицы
        const filmsHire = []
        const filmsNew = []

        for (let i = 0; i < this.films.length; i++) {
            if (this.films[i].hire === true) {
                filmsHire.push(this.films[i])
            }
            if (this.films[i].hire === false && this.films[i].new === true) {
                filmsNew.push(this.films[i])
            }
        }
        
        const film = {
            getName: function () {
                return this.name
            },
            getStart: function () {
                return this.start
            },
            getGanar: function () {
                const ganarsIds = this.ganar
                const arrGanars = [];
                for (let i = 0; i < ganarsIds.length; i++) {
                    const currentId = ganarsIds[i];
                    const ganarText = ganars.find(
                        function (el) {
                            return el.id == currentId;
                        }
                    ).name;
                    arrGanars.push(ganarText);
                }
                const strGanars = arrGanars.join(", ");
                return strGanars;
            },
            getDescription: function () {
                return this.description
            },
            getImg: function () {
                return this.img
            },
            getFb: function () {
                return this.fb
            },
            getTw: function () {
                return this.twitter
            },
            getBh: function () {
                return this.behance
            },
            getPrice: function () {
                return this.price
            },
        }
        let orderForm = document.getElementById(`orderForm`)
        let closeOrderForm = document.getElementById(`closeOrderForm`)

        closeOrderForm.onclick = function () {
            orderForm.style.display = `none`
        }


        for (let i = 0; i < filmsHire.length; i++) {
            const filmName = film.getName.bind(filmsHire[i])()
            const filmStart = film.getStart.bind(filmsHire[i])()
            const filmGanar = film.getGanar.bind(filmsHire[i])()
            const filmsHireHTML = document.getElementById(this.elementId)
            const filmPrice = film.getPrice.bind(filmsHire[i])()

            const filmHTML = `
    <td class="movie-table__colona1" id="start_film_${1}">${filmStart}</td>
    <td class="movie-table__colona2" id="name_film_${1}">${filmName}<a
    href="https://www.kinopoisk.ru/film/838/" target="_blank" title="Кинопоиск"></a>
    </td>
    <td class="movie-table__colona3" id="ganar_film_${1}">${filmGanar}</td>
    <td class="movie-table__colona4>${filmPrice}</td>`
            const tr = document.createElement(`tr`)
            tr.innerHTML = filmHTML
            filmsHireHTML.appendChild(tr)

            //  Вспылывающее окно для заказа билета 

            tr.onclick = function () {
                orderForm.style.display = `block`
                let orderFilmName = document.getElementById(`orderFilmName`)
                let orderFilmStart = document.getElementById(`orderFilmStart`)
                let orderFilmGanar = document.getElementById(`orderFilmGanar`)
                let orderFilmPrice = document.getElementById(`orderFilmPrice`)

                orderFilmName.innerHTML = filmName
                orderFilmStart.innerHTML = filmStart
                orderFilmGanar.innerHTML = filmGanar
                orderFilmPrice.innerHTML = filmPrice
            }
            let orderFilmPrice = document.getElementById(`orderFilmPrice`)
            let orderFilmCountTicket = document.getElementById(`orderFilmCountTicket`)
            let orderFilmTotalPrice = document.getElementById(`orderFilmTotalPrice`)


            orderFilmCountTicket.onchange = function () {
                if (orderFilmCountTicket.value < 1) {
                    orderFilmCountTicket.value = Math.abs(orderFilmCountTicket.value)
                } else {}
                orderFilmTotalPrice.innerHTML = filmPrice * orderFilmCountTicket.value
            }
        }

        let sendOrder = document.getElementById(`sendOrder`)
        sendOrder.onclick = function () {
            let orderFilmPhone = document.getElementById(`orderFilmPhone`)
            let orderFilmNameGuest = document.getElementById(`orderFilmNameGuest`)

            if (orderFilmPhone.value) {
                console.log(`orderFilmPhone`, orderFilmPhone.value)
                orderFilmPhone.style.border = `1px solid #bebebe`
            } else {
                orderFilmPhone.style.border = `2px solid red`

            }
            if (orderFilmNameGuest.value) {
                console.log(`orderFilmNameGuest`, orderFilmNameGuest.value)
                orderFilmNameGuest.style.border = `1px solid #bebebe`
            } else {
                orderFilmNameGuest.style.border = `2px solid red`

            }

        }

        

    }
    zallFilms(){
        // Заполнение массива мест
        let places = [],
         brone='',
         place='',
         price='';

        function fill(n) {
            for (let i = 1; i <= n; i++) {
                let result = Math.floor(Math.random() * 2)
                if (result > 0) {
                    brone = true
                } else {
                    brone = false
                }
                if (i > 2 && i < 7) {
                    price = 120;

                } else {
                    price = 100;
                }
                places.push({
                    'brone': brone,
                    'number': i,
                    'price': price,
                })
            }
        }
        fill(10)

        //  Вставка 

        let placesHTML = document.querySelector('.places')
        let zall = document.createElement('div')

        for (place of places) {
            let placeDiv = document.createElement('div')
            placeDiv.innerHTML = place.number
            placeDiv.classList.add('placeDiv')
            placeDiv.number = place.number
            placeDiv.price = place.price
            zall.classList.add('places')
            if (place.brone) {
                placeDiv.classList.add('placeBrone')
            } else {
                placeDiv.classList.add('placeFree')
            }
            // placeDiv.addEventListener('click',order)//обработка клика на квадрате с местом, заполнение элементов input формы;
            // placeDiv.addEventListener('click',order)//обработка клика на квадрате с местом, заполнение элементов input формы;
            placeDiv.addEventListener('click', placeToggle) //обработка клика на квадрате с местом, смена цвета;
            placeDiv.addEventListener('contextmenu', placeContext)
            placeDiv.addEventListener('mouseover', placeHover) //обработка события перемещения курсора мыши над элементом;
            placeDiv.addEventListener('mouseout', placeHoverOut) //обработка события перемещения курсора мыши запределы элемента;
            zall.append(placeDiv)


        }


        placesHTML.append(zall)

        // Создание функций обработчиков
        let booking = false
        let clientBroneHTML = document.querySelector('.clientBrone')

        function order(e) {

        }

        function placeToggle(e) {
            if (booking === true) {
                e.target.classList.toggle(`placeBooking`)
            } else if (e.target.classList.contains('placeBrone')) {

            } else {
                e.target.classList.remove(`placeBooking`)
                e.target.classList.add('placeFree')
            }
        }

        function placeContext(e) {
            event.preventDefault()
            let showPrice = this.price
            alert(`Цена билета : ${showPrice}`)
        }

        function placeHover(e) {
            e.target.classList.add(`placeMove`)

        }

        function placeHoverOut(e) {
            e.target.classList.remove(`placeMove`)

        }


        //клик на модальном окне 

        let modalHTML = document.getElementById("orderForm")
        modalHTML.onclick = function (e) {
            if (event.srcElement.classList.contains('placeDiv')) {
                if (e.target.classList.contains('placeBrone')) {
                    alert(`Место занято`)
                    const booking = true

                } else {
                    if (booking === false) {
                        booking = true
                        clientBroneHTML.innerText = this.number
                        console.log(`нанести`)
                    } else {
                        booking = false
                        clientBroneHTML.innerText = ''
                        console.log(`снять`)
                    }
                }
            } else {
                console.log(` не попал`)
            }
        }

    }

}