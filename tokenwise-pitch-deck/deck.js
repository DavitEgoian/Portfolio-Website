(function () {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const counter = document.getElementById('counter');
  let current = 0;

  function show(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    counter.textContent = `${index + 1} / ${slides.length}`;
    current = index;
  }

  prevBtn.addEventListener('click', () => show(Math.max(0, current - 1)));
  nextBtn.addEventListener('click', () => show(Math.min(slides.length - 1, current + 1)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      show(Math.min(slides.length - 1, current + 1));
    } else if (e.key === 'ArrowLeft') {
      show(Math.max(0, current - 1));
    }
  });

  show(0);
})();
