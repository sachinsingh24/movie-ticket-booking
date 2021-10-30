'use strict';

// variables

const seatsContainer = document.getElementById('screen-container');
const seats = document.querySelectorAll('.seat-row .seats:not(.booked)');
const All_Seats = document.querySelectorAll('.seat-row .seats');
const movieSelected = document.getElementById('Movie-list');
const amount = document.getElementById('count');
let TotalPrice = document.getElementById('total');
//const selectedseats = document.querySelectorAll('.seat-row .seats.selected');
let movieName = movieSelected.value;
let seatPrice = [];

// functions
const PriceValue = () => {
  const selectedseats = document.querySelectorAll('.seat-row .seats.selected');
  const seatsindex = [...selectedseats].map((seat) => {
    return [...All_Seats].indexOf(seat);
  });
  console.log(seatsindex);
  seatPrice.splice(0, seatPrice.length);
  for (let i = 0; i < seatsindex.length; i++) {
    if (seatsindex[i] <= 17) {
      seatPrice.push(100);
    } else if (seatsindex[i] <= 44 && seatsindex[i] >= 18) {
      seatPrice.push(200);
    } else {
      seatPrice.push(300);
    }
  }
  let sumPrice = seatPrice.reduce((a, b) => a + b, 0);
  TotalPrice.innerText = `₹ ${sumPrice}`;
  setMovieData(movieName, seatPrice, sumPrice);
};

const populateUI = () => {
  const selectedseats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedseats !== null && selectedseats >= 0) {
    seats.forEach((seat, index) => {
      if (selectedseats.indexOf(index) > -1) {
        seat.classList.add('selected');
      } else {
        seat.classList.remove('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelected.selectedIndex = selectedMovieIndex;
  }
};
populateUI();

const updateSelectedCount = () => {
  const selectedseats = document.querySelectorAll('.seat-row .seats.selected');
  const seatsindex = [...selectedseats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem('selectedSeats', JSON.stringify(seatsindex));
  amount.innerText = selectedseats.length;
};

const setMovieData = (MovieIndex, MoviePrice, SumPrice) => {
  localStorage.setItem('SelectedMovie', MovieIndex);
  localStorage.setItem('SelectedPrice', JSON.stringify(MoviePrice));
  localStorage.setItem('TotalPrice', SumPrice);
};

// Event Listener
movieSelected.addEventListener('change', (e) => {
  movieName = e.target.value;
  // #some code have to write if change of movie selection
  updateSelectedCount();
  PriceValue();
});

seatsContainer.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seats') &&
    !e.target.classList.contains('booked')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
    PriceValue();
  }
});

// initial settings
populateUI();
updateSelectedCount();
