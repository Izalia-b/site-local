import FilmsTable from './components/films-table/films-table.js';
import {films} from './__data__/constants/films.js';



import '../node_modules/owl.carousel/node_modules/jquery/dist/jquery.js'; 
// import 'jquery'; 
import '../node_modules/owl.carousel/dist/owl.carousel.js'; 

import './films.js';
import './getPresent.js';
import './ajax.js';
import './buttonAndOwl.js';


const chooseFilm = new FilmsTable (films);
chooseFilm.render();
chooseFilm.zallFilms();

// const popFilms = films.map(film=>({ ...film,  hire:!film.hire }));
// const chooseFilmNew = new FilmsTable(popFilms,'newFilm')
// chooseFilmNew.render();








