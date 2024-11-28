const filters = document.querySelectorAll('.advanced__filter');

function dropdownFilter(dropdown) {
  dropdown.classList.toggle('active')
}

filters.forEach(filter => {
  const dropdown = filter.querySelector('.advanced__dropdown-menu');
  filter.querySelector('.fa-chevron-down').addEventListener('click', (event) => {
    dropdownFilter(dropdown)
    event.stopPropagation();
  })

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('active'); // Fermer le menu si clic à l'extérieur
    }
  });

});

