document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
  });
});

const navToggle = document.getElementById('nav-toggle'),
      navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));

const revealItems = document.querySelectorAll('.reveal, .gallery img');
const revealOnScroll = entries => {
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
};
const observer = new IntersectionObserver(revealOnScroll, { threshold:0.15 });
revealItems.forEach(el=> observer.observe(el));

const form = document.getElementById('contact-form'),
      status = document.getElementById('form-status');
form.addEventListener('submit', e=>{
  e.preventDefault();
  status.textContent = 'Wysyłanie...';
  fetch('/send-form', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(Object.fromEntries(new FormData(form)))
  })
  .then(r => r.ok ? status.textContent = 'Dzięki! Wiadomość wysłana.' : Promise.reject('błąd'))
  .catch(_=> status.textContent = 'Wystąpił błąd. Spróbuj ponownie.');
});