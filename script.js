let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Bajando - ocultar header
        header.classList.add('hidden');
    } else {
        // Subiendo - mostrar header
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});