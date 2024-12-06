const filters = document.querySelectorAll('.advanced__filter');

function dropdownFilter(dropdown) {
  dropdown.classList.toggle('active')
}

filters.forEach(filter => {
  const chevron = filter.querySelector('.fa-chevron-down')
  const dropdown = filter.querySelector('.advanced__dropdown-menu');
  chevron.addEventListener('click', (event) => {
    dropdownFilter(dropdown)
    event.stopPropagation();

    const isOpen = dropdown.classList.contains('active');
    // Applique la rotation du chevron 
    chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    // Met le focus sur l'input
    isOpen && filter.querySelector('input').focus()
  })

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('active'); // Fermer le menu si clic à l'extérieur
    }
  });

});

