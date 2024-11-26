const filter = document.querySelector('.advanced__filter');
const dropdown = document.querySelector('.advanced__dropdown-menu');

function dropdownFilter() {
  dropdown.classList.toggle('active')
}

filter.addEventListener('click', () => dropdownFilter())