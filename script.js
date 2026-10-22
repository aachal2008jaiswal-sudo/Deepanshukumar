const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('admissionForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const studentName = document.getElementById('studentName').value.trim();
  const studentClass = document.getElementById('studentClass').value;
  const course = document.getElementById('course').value;
  const guardianPhone = document.getElementById('guardianPhone').value.trim();
  if (!/^[0-9]{10}$/.test(guardianPhone)) {
    alert('Please enter a valid 10-digit parent/guardian phone number.');
    return;
  }
  const message = `Namaste Deepanshu Sir, I want to enquire about admission.\nStudent name: ${studentName}\nClass: ${studentClass}\nCourse: ${course}\nParent/guardian phone: ${guardianPhone}`;
  window.open(`https://wa.me/917897688978?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
