const filters = document.querySelectorAll('.advanced__filter');
const dropdown = document.querySelector('.advanced__dropdown-menu');

function dropdownFilter(dropdown) {
  dropdown.classList.toggle('active')
}

filters.forEach(filter => {
  const dropdown = filter.querySelector('.advanced__dropdown-menu');
  filter.querySelector('.fa-chevron-down').addEventListener('click', () => dropdownFilter(dropdown))
});
