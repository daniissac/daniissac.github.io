document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.transition-section');

  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      // Calculate visibility percentage
      const visibilityPercentage = Math.min((scrollY - sectionTop + windowHeight) / sectionHeight, 1);

      // Toggle "in-view" class based on visibility
      if (visibilityPercentage >= 0.5) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    });
  });
});

