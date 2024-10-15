$(document).ready(function () {

    const sections = document.querySelectorAll("section"); // Asume que tus secciones son <section>
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("link-active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("link-active");
            }
        });
    });

    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-body .nav-link');

    offcanvasLinks.forEach(link => {
        link.addEventListener('click', function () {
            const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
            offcanvas.hide();
        });
    });
});

function fillcharlas(speakers) {
    speakers.forEach((speaker, index) => {
        
    })
}