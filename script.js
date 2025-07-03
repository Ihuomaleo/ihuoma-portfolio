// Sidebar toggle script integrated on 2025‑07‑02
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('closeBtn');

  const closeSidebar = () => sidebar.classList.remove('active');

  hamburger.addEventListener('click', () => sidebar.classList.add('active'));
  closeBtn.addEventListener('click', closeSidebar);

  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("toggle");
  });
});
