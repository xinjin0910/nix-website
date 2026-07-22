const revealItems = document.querySelectorAll(".card, .product-card, .how-step, .spec-item");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealItems.forEach(item => {
  item.classList.add("reveal");
  observer.observe(item);
});
