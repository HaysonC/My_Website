document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.projects-grid');
  const cards = Array.from(grid.querySelectorAll('.project-card'));
  const btn = document.getElementById('toggle-projects');
  const initialCount = 4;

  cards.forEach((c, i) => {
    if (i >= initialCount) c.style.display = 'none';
  });

  let expanded = false;
  btn.addEventListener('click', () => {
    expanded = !expanded;
    cards.forEach((c, i) => {
      if (i >= initialCount) {
        c.style.display = expanded ? '' : 'none';
      }
    });
    btn.textContent = expanded ? 'View Less' : 'View More';
  });
});
