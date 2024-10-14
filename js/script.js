$(document).ready(function () {
    fillSpeakers(speakers);
    fillAliados(aliados_sponsors);

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
});

function fillSpeakers(speakers) {
    speakers.forEach(function (speaker) {
        $("#speakers-container").append(`
            <div class="col-sm-12 col-md-6 p-3 p-md-5">
                <div class="p-2">
                    <img src="./img/speakers/${formatSpeakerName(speaker.nombres, speaker.apellidos)}" width=200 alt="user" class="img-fluid rounded-circle d-block m-auto">
                    <h5 class="my-3 text-main fw-bold d-flex align-items-center justify-content-center gap-2">
                        ${speaker.nombres} ${speaker.apellidos}
                        <img width="30" height="30" src="https://img.icons8.com/color/48/${speaker.pais}.png" alt="${speaker.pais}-emoji"/>
                    </h5>
                    <p class="text-gray text-center my-3">${speaker.perfil}</p>
                    <div class="d-flex justify-content-center align-items-center gap-1">
                        ${Object.keys(speaker.social_media).map(social => {
                            return `<a class="text-decoration-none" href="${speaker.social_media[social]}">
                                <div class="social-media media-speaker bg-main text-white fs-6">
                                    <i class="fa-brands fa-${social}"></i>
                                </div>
                            </a>`
                        }).toString().replace(/,/g, '')}
                    </div>
                </div>
            </div>
        `)
    })
}


function fillAliados(aliados_sponsors) {
    aliados_sponsors.forEach(element => {
        $(`#${element.type}s-container`).append(`<div class="col-sm-12 col-md-6 col-lg-4 p-2 py-md-5 px-md-2">
            <div class="text-center px-2 py-4 bg-white">
                <h5 class="text-white d-flex justify-content-center align-items-center gap-2 fs-4 fw-bold text-nowrap">
                    <img src="./img/${element.type}s/${element.nombre}.png" height=70/>
                </h5>
                <p class="text-gray py-2 mx-1 mx-lg-5 text-center">
                    ${element.slogan}
                </p>
            </div>
        </div>
        `);
    })
}

/**
 * 
 * @param {string} name 
 * @param {string} surname 
 */
function formatSpeakerName(name, surname) {
    return name.toLowerCase() + "_" + surname.toLowerCase() + ".png"
}