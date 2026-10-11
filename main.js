document.addEventListener("DOMContentLoaded", () => {
    // 1. Resaltar enlace activo del menú de navegación
    const pathActual = window.location.pathname.split("/").pop() || "index.html";
    const menuLinks = document.querySelectorAll('.header__menu__link');

    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === pathActual) {
            link.classList.add('header__menu__link--activo');
        }
    });

    // 2. Animación de aparición (Fade-In) al hacer scroll
    const elementosAnimados = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementosAnimados.forEach(el => {
        observer.observe(el);
    });

    // 3. Solución para la descarga del CV en dispositivos móviles
    const btnCv = document.querySelector('.btn-cv');
    if (btnCv) {
        btnCv.addEventListener('click', (e) => {
            // Detectar si el usuario está en un dispositivo móvil (Android / iOS)
            const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (esMovil) {
                // En móviles, aseguramos que abra en blanco por si el navegador bloquea el atributo download
                e.preventDefault();
                const urlPdf = btnCv.getAttribute('href');
                window.open(urlPdf, '_blank');
            }
        });
    }
});