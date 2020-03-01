
// Заполнение фильмов в слайдер
let p = new Promise((resolve, reject) => {

    var url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e2c01b015b375681951ef2536440f652';
    // var url2 = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-10-01&primary_release_date.lte=2019-11-01&api_key=e2c01b015b375681951ef2536440f652'
    var request = new XMLHttpRequest(); //XHR

    request.open('GET', url, true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // Success!

            var data = JSON.parse(this.response);
            //console.log(data)
            resolve(data)
        } else {
            // We reached our target server, but it returned an error
            reject()
        }
    };

    request.onerror = function () {
        console.log('Ошибка соединения')
        // There was a connection error of some sort
    };

    request.send();

})


p.then((data) => {
    const films = data.results


    const urlServerApiImages = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
    const filmsForSlider = films.map(film => {
        return ({
            filmName: film.title,
            genre_ids: film.genre_ids,
            poster_path: urlServerApiImages + film.poster_path,
            release_date: film.release_date,
            facebook: 'https://www.fb.com',
            twitter: 'http://twitter.com',
            behance: 'http://behance.net',
            dribble: 'https://dribbble.com/',
        })
    })

    let sliderSection = document.getElementById('sliderSection')

    for (let i = 0; i < filmsForSlider.length; i++) {
        let itemName = filmsForSlider[i].filmName;
        let itemPoster = filmsForSlider[i].poster_path;
        let itemRelease = filmsForSlider[i].release_date;
        let linkFb = filmsForSlider[i].facebook;
        let linkTwitter = filmsForSlider[i].twitter;
        let linkBehance = filmsForSlider[i].behance;
        let linkDribble = filmsForSlider[i].dribble;

        let filmHtml = `
    <div class="interactive-mosaic spider"> 
                        <div class="interactive-mosaic_inner1">
                            <a class="interactive-mosaic_poster" href="https://www.kinopoisk.ru/film/838/"
                                target="_blank" title="Кинопоиск">
                                <img src=${itemPoster}> 
                            </a>
                            <div class="interactive-mosaic_description">
                                <p class="interactive-mosaic__text1" id="name_filmGrid_1"> ${itemName}</p>
                                <hr class="interactive-mosaic__hr">
                                <div class="interactive-mosaic__text2" id="description_filmGrid_1"> ${itemRelease}</div>
                                <div id="svg_filmGrid_1" class="interactive-mosaic__links">
                                    <a class="interactive-mosaic__links1" href="${linkFb}">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px">
                                            <defs>
                                                <filter filterUnits="userSpaceOnUse" id="Filter_0" x="0px" y="0px"
                                                    width="34px" height="34px">
                                                    <feOffset in="SourceAlpha" dx="0" dy="1" />
                                                    <feGaussianBlur result="blurOut" stdDeviation="1" />
                                                    <feFlood flood-color="rgb(0, 0, 0)" result="floodOut" />
                                                    <feComposite operator="atop" in="floodOut" in2="blurOut" />
                                                    <feComponentTransfer>
                                                        <feFuncA type="linear" slope="0.25" />
                                                    </feComponentTransfer>
                                                    <feMerge>
                                                        <feMergeNode />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            <g filter="url(#Filter_0)">
                                                <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
                                                    d="M16.350,30.764 C7.872,30.764 1.000,23.882 1.000,15.393 C1.000,6.903 7.872,0.021 16.350,0.021 C24.828,0.021 31.700,6.903 31.700,15.393 C31.700,23.882 24.828,30.764 16.350,30.764 ZM16.721,6.969 C13.254,6.969 14.044,11.088 13.929,12.590 C13.929,12.601 11.809,12.590 11.809,12.590 L11.809,15.384 L13.922,15.384 L13.922,25.220 L17.434,25.220 L17.426,15.384 L19.779,15.384 L20.240,12.574 L17.434,12.605 C17.434,10.610 17.280,9.799 18.445,9.799 C18.549,9.799 20.251,9.795 20.251,9.795 L20.255,6.969 L16.721,6.969 Z" />
                                            </g>
                                        </svg>
                                    </a>
                                    <a class="interactive-mosaic__links1" href="${linkTwitter}">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px">
                                            <defs>
                                                <filter filterUnits="userSpaceOnUse" id="Filter_0" x="0px" y="0px"
                                                    width="34px" height="34px">
                                                    <feOffset in="SourceAlpha" dx="0" dy="1" />
                                                    <feGaussianBlur result="blurOut" stdDeviation="1" />
                                                    <feFlood flood-color="rgb(0, 0, 0)" result="floodOut" />
                                                    <feComposite operator="atop" in="floodOut" in2="blurOut" />
                                                    <feComponentTransfer>
                                                        <feFuncA type="linear" slope="0.25" />
                                                    </feComponentTransfer>
                                                    <feMerge>
                                                        <feMergeNode />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            <g filter="url(#Filter_0)">
                                                <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
                                                    d="M16.537,30.747 C8.060,30.747 1.187,23.865 1.187,15.375 C1.187,6.885 8.060,0.003 16.537,0.003 C25.015,0.003 31.887,6.885 31.887,15.375 C31.887,23.865 25.015,30.747 16.537,30.747 ZM24.698,13.855 C23.512,9.722 20.664,9.722 20.664,9.722 C20.664,9.722 21.873,9.034 21.838,8.615 C21.466,8.348 20.720,8.883 20.657,8.883 C20.845,8.751 20.733,8.373 20.489,8.231 C20.129,8.266 19.815,8.930 19.815,8.930 C19.815,8.930 19.638,8.604 19.478,8.604 C17.571,9.128 16.228,13.535 16.234,13.541 C10.007,9.332 9.595,10.141 9.595,10.152 C9.106,11.247 11.001,12.633 11.001,12.633 L10.460,12.649 C10.460,12.649 9.663,12.623 9.837,13.192 C10.015,13.920 10.959,14.674 10.967,14.682 C11.432,14.903 12.013,14.693 12.013,14.693 C12.013,14.693 11.397,15.016 11.007,15.260 C10.364,15.675 10.826,16.044 10.896,16.114 C11.733,17.011 13.048,16.953 13.048,16.953 C13.048,16.953 12.437,17.686 12.432,17.965 C12.432,18.419 12.839,18.699 12.873,18.734 C13.237,18.984 13.776,19.013 13.780,19.013 C10.411,22.588 6.351,18.992 6.351,18.979 C6.804,21.598 10.653,24.125 17.420,23.147 C22.908,22.274 24.663,16.254 24.663,16.254 C24.663,16.254 26.931,16.382 27.187,15.031 C26.477,15.159 25.454,14.950 25.454,14.950 C25.454,14.950 27.198,14.193 27.280,13.285 C26.256,14.076 24.733,13.855 24.698,13.855 Z" />
                                            </g>
                                        </svg>
                                    </a>
                                    <a class="interactive-mosaic__links1" href="${linkBehance}">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="34px">
                                            <defs>
                                                <filter filterUnits="userSpaceOnUse" id="Filter_0" x="0px" y="0px"
                                                    width="35px" height="34px">
                                                    <feOffset in="SourceAlpha" dx="0" dy="1" />
                                                    <feGaussianBlur result="blurOut" stdDeviation="1" />
                                                    <feFlood flood-color="rgb(0, 0, 0)" result="floodOut" />
                                                    <feComposite operator="atop" in="floodOut" in2="blurOut" />
                                                    <feComponentTransfer>
                                                        <feFuncA type="linear" slope="0.25" />
                                                    </feComponentTransfer>
                                                    <feMerge>
                                                        <feMergeNode />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>

                                            </defs>
                                            <g filter="url(#Filter_0)">
                                                <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
                                                    d="M16.806,30.764 C8.328,30.764 1.456,23.882 1.456,15.393 C1.456,6.903 8.328,0.021 16.806,0.021 C25.283,0.021 32.156,6.903 32.156,15.393 C32.156,23.882 25.283,30.764 16.806,30.764 ZM16.969,12.741 C16.969,9.268 13.194,9.547 13.194,9.547 L7.596,9.549 L7.603,21.872 L12.826,21.837 C12.826,21.837 17.320,22.183 17.360,18.148 C17.360,15.798 15.465,15.234 15.465,15.234 C15.465,15.234 16.969,14.689 16.969,12.741 ZM25.305,10.217 L20.513,10.217 L20.513,11.592 L25.305,11.592 L25.305,10.217 ZM22.854,12.325 C18.267,12.325 18.493,17.138 18.493,17.138 C18.493,17.138 18.237,21.877 22.944,21.877 C26.568,21.877 27.094,18.885 27.094,18.885 L24.763,18.885 C24.763,18.885 24.387,19.940 23.004,19.924 C20.733,19.924 20.809,17.726 20.809,17.726 L27.199,17.695 C27.199,17.695 27.861,12.325 22.854,12.325 ZM22.839,14.292 C24.808,14.292 24.854,16.160 24.854,16.160 L20.854,16.190 C20.854,16.190 21.004,14.292 22.839,14.292 ZM12.723,19.704 L10.117,19.694 L10.107,16.410 C10.107,16.410 11.692,16.421 12.758,16.421 C12.754,16.421 14.768,16.280 14.768,17.947 C14.768,19.944 12.723,19.704 12.723,19.704 ZM12.743,14.398 L10.112,14.413 L10.112,11.687 L12.385,11.699 C12.385,11.699 14.518,11.416 14.518,13.012 C14.518,14.609 12.743,14.398 12.743,14.398 Z" />
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
    `
        let div = document.createElement(`div`)
        div.innerHTML = filmHtml
        sliderSection.appendChild(div)
    }
})


// // Заполнение фильмов в слайдер
// let p = new Promise((resolve, reject) => {

//     var url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e2c01b015b375681951ef2536440f652';
//     // var url2 = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-10-01&primary_release_date.lte=2019-11-01&api_key=e2c01b015b375681951ef2536440f652'
//     var request = new XMLHttpRequest(); //XHR

//     request.open('GET', url, true);

//     request.onload = function () {
//         if (this.status >= 200 && this.status < 400) {
//             // Success!

//             var data = JSON.parse(this.response);
//             //console.log(data)
//             resolve(data)
//         } else {
//             // We reached our target server, but it returned an error
//             reject()
//         }
//     };

//     request.onerror = function () {
//         console.log('Ошибка соединения')
//         // There was a connection error of some sort
//     };

//     request.send();

// })


// p.then((data) => {
//     const films = data.results


//     const urlServerApiImages = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
//     const filmsForSlider = films.map(film => {
//         return ({
//             filmName: film.title,
//             genre_ids: film.genre_ids,
//             poster_path: urlServerApiImages + film.poster_path,
//             release_date: film.release_date,
//             facebook: 'https://www.fb.com',
//             twitter: 'http://twitter.com',
//             behance: 'http://behance.net',
//             dribble: 'https://dribbble.com/',
//         })
//     })

//     let sliderSection = document.getElementById('sliderSection')

//     for (let i = 0; i < filmsForSlider.length; i++) {
//         let itemName = filmsForSlider[i].filmName;
//         let itemPoster = filmsForSlider[i].poster_path;
//         let itemRelease = filmsForSlider[i].release_date;
//         let linkFb = filmsForSlider[i].facebook;
//         let linkTwitter = filmsForSlider[i].twitter;
//         let linkBehance = filmsForSlider[i].behance;
//         let linkDribble = filmsForSlider[i].dribble;

//         let filmHtml = `
//     <div class="interactive-mosaic spider"> 
//                         <div class="interactive-mosaic_inner1">
//                             <a class="interactive-mosaic_poster" href="https://www.kinopoisk.ru/film/838/"
//                                 target="_blank" title="Кинопоиск">
//                                 <img src=${itemPoster}> 
//                             </a>
//                             <div class="interactive-mosaic_description">
//                                 <p class="interactive-mosaic__text1" id="name_filmGrid_1"> ${itemName}</p>
//                                 <hr class="interactive-mosaic__hr">
//                                 <div class="interactive-mosaic__text2" id="description_filmGrid_1"> ${itemRelease}</div>
//                                 <div id="svg_filmGrid_1" class="interactive-mosaic__links">
//                                     <a class="interactive-mosaic__links1" href="${linkFb}">
//                                         <svg xmlns="http://www.w3.org/2000/svg"
//                                             xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px">
//                                             <defs>
//                                                 <filter filterUnits="userSpaceOnUse" id="Filter_0" x="0px" y="0px"
//                                                     width="34px" height="34px">
//                                                     <feOffset in="SourceAlpha" dx="0" dy="1" />
//                                                     <feGaussianBlur result="blurOut" stdDeviation="1" />
//                                                     <feFlood flood-color="rgb(0, 0, 0)" result="floodOut" />
//                                                     <feComposite operator="atop" in="floodOut" in2="blurOut" />
//                                                     <feComponentTransfer>
//                                                         <feFuncA type="linear" slope="0.25" />
//                                                     </feComponentTransfer>
//                                                     <feMerge>
//                                                         <feMergeNode />
//                                                         <feMergeNode in="SourceGraphic" />
//                                                     </feMerge>
//                                                 </filter>
//                                             </defs>
//                                             <g filter="url(#Filter_0)">
//                                                 <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
//                                                     d="M16.350,30.764 C7.872,30.764 1.000,23.882 1.000,15.393 C1.000,6.903 7.872,0.021 16.350,0.021 C24.828,0.021 31.700,6.903 31.700,15.393 C31.700,23.882 24.828,30.764 16.350,30.764 ZM16.721,6.969 C13.254,6.969 14.044,11.088 13.929,12.590 C13.929,12.601 11.809,12.590 11.809,12.590 L11.809,15.384 L13.922,15.384 L13.922,25.220 L17.434,25.220 L17.426,15.384 L19.779,15.384 L20.240,12.574 L17.434,12.605 C17.434,10.610 17.280,9.799 18.445,9.799 C18.549,9.799 20.251,9.795 20.251,9.795 L20.255,6.969 L16.721,6.969 Z" />
//                                             </g>
//                                         </svg>
//                                     </a>
//                                     <a class="interactive-mosaic__links1" href="${linkTwitter}">
//                                         <svg xmlns="http://www.w3.org/2000/svg"
//                                             xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px">
//                                             <defs>
//                                                 <filter filterUnits="userSpaceOnUse" id="Filter_0" x="0px" y="0px"
//                                                     width="34px" height="34px">
//                                                     <feOffset in="SourceAlpha" dx="0" dy="1" />
//                                                     <feGaussianBlur result="blurOut" stdDeviation="1" />
//                                                     <feFlood flood-color="rgb(0, 0, 0)" result="floodOut" />
//                                                     <feComposite operator="atop" in="floodOut" in2="blurOut" />
//                                                     <feComponentTransfer>
//                                                         <feFuncA type="linear" slope="0.25" />
//                                                     </feComponentTransfer>
//                                                     <feMerge>
//                                                         <feMergeNode />
//                                                         <feMergeNode in="SourceGraphic" />
//                                                     </feMerge>
//                                                 </filter>
//                                             </defs>
//                                             <g filter="url(#Filter_0)">
//                                                 <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
//                                                     d="M16.537,30.747 C8.060,30.747 1.187,23.865 1.187,15.375 C1.187,6.885 8.060,0.003 16.537,0.003 C25.015,0.003 31.887,6.885 31.887,15.375 C31.887,23.865 25.015,30.747 16.537,30.747 ZM24.698,13.855 C23.512,9.722 20.664,9.722 20.664,9.722 C20.664,9.722 21.873,9.034 21.838,8.615 C21.466,8.348 20.720,8.883 20.657,8.883 C20.845,8.751 20.733,8.373 20.489,8.231 C20.129,8.266 19.815,8.930 19.815,8.930 C19.815,8.930 19.638,8.604 19.478,8.604 C17.571,9.128 16.228,13.535 16.234,13.541 C10.007,9.332 9.595,10.141 9.595,10.152 C9.106,11.247 11.001,12.633 11.001,12.633 L10.460,12.649 C10.460,12.649 9.663,12.623 9.837,13.192 C10.015,13.920 10.959,14.674 10.967,14.682 C11.432,14.903 12.013,14.693 12.013,14.693 C12.013,14.693 11.397,15.016 11.007,15.260 C10.364,15.675 10.826,16.044 10.896,16.114 C11.733,17.011 13.048,16.953 13.048,16.953 C13.048,16.953 12.437,17.686 12.432,17.965 C12.432,18.419 12.839,18.699 12.873,18.734 C13.237,18.984 13.776,19.013 13.780,19.013 C10.411,22.588 6.351,18.992 6.351,18.979 C6.804,21.598 10.653,24.125 17.420,23.147 C22.908,22.274 24.663,16.254 24.663,16.254 C24.663,16.254 26.931,16.382 27.187,15.031 C26.477,15.159 25.454,14.950 25.454,14.950 C25.454,14.950 27.198,14.193 27.280,13.285 C26.256,14.076 24.733,13.855 24.698,13.855 Z" />
//                                             </g>
//                                         </svg>
//                                     </a>
//                                     <a class="interactive-mosaic__links1" href="${linkBehance}">
//                                         <svg xmlns="http://www.w3.org/2000/svg"
//                                             xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="34px">
//                                             <defs>
//                                                 <filter filterUnits="userSpaceOnUse" id="Filter_0" x="0px" y="0px"
//                                                     width="35px" height="34px">
//                                                     <feOffset in="SourceAlpha" dx="0" dy="1" />
//                                                     <feGaussianBlur result="blurOut" stdDeviation="1" />
//                                                     <feFlood flood-color="rgb(0, 0, 0)" result="floodOut" />
//                                                     <feComposite operator="atop" in="floodOut" in2="blurOut" />
//                                                     <feComponentTransfer>
//                                                         <feFuncA type="linear" slope="0.25" />
//                                                     </feComponentTransfer>
//                                                     <feMerge>
//                                                         <feMergeNode />
//                                                         <feMergeNode in="SourceGraphic" />
//                                                     </feMerge>
//                                                 </filter>

//                                             </defs>
//                                             <g filter="url(#Filter_0)">
//                                                 <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
//                                                     d="M16.806,30.764 C8.328,30.764 1.456,23.882 1.456,15.393 C1.456,6.903 8.328,0.021 16.806,0.021 C25.283,0.021 32.156,6.903 32.156,15.393 C32.156,23.882 25.283,30.764 16.806,30.764 ZM16.969,12.741 C16.969,9.268 13.194,9.547 13.194,9.547 L7.596,9.549 L7.603,21.872 L12.826,21.837 C12.826,21.837 17.320,22.183 17.360,18.148 C17.360,15.798 15.465,15.234 15.465,15.234 C15.465,15.234 16.969,14.689 16.969,12.741 ZM25.305,10.217 L20.513,10.217 L20.513,11.592 L25.305,11.592 L25.305,10.217 ZM22.854,12.325 C18.267,12.325 18.493,17.138 18.493,17.138 C18.493,17.138 18.237,21.877 22.944,21.877 C26.568,21.877 27.094,18.885 27.094,18.885 L24.763,18.885 C24.763,18.885 24.387,19.940 23.004,19.924 C20.733,19.924 20.809,17.726 20.809,17.726 L27.199,17.695 C27.199,17.695 27.861,12.325 22.854,12.325 ZM22.839,14.292 C24.808,14.292 24.854,16.160 24.854,16.160 L20.854,16.190 C20.854,16.190 21.004,14.292 22.839,14.292 ZM12.723,19.704 L10.117,19.694 L10.107,16.410 C10.107,16.410 11.692,16.421 12.758,16.421 C12.754,16.421 14.768,16.280 14.768,17.947 C14.768,19.944 12.723,19.704 12.723,19.704 ZM12.743,14.398 L10.112,14.413 L10.112,11.687 L12.385,11.699 C12.385,11.699 14.518,11.416 14.518,13.012 C14.518,14.609 12.743,14.398 12.743,14.398 Z" />
//                                             </g>
//                                         </svg>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//     `
//         let div = document.createElement(`div`)
//         div.innerHTML = filmHtml
//         sliderSection.appendChild(div)
//     }
// })

