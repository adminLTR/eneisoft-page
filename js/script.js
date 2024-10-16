$(document).ready(function () {
    if (document.getElementById("speakers-container")){
        fillSpeakers(speakers);
    }

    if (document.getElementById("aliados-container") || document.getElementById("sponsors-container")){
        fillAliados(aliados_sponsors);
    }

    if (document.getElementById("agenda-container")) {
        fillAgenda(agenda);
    }

    fillEventos(speakers, "talleres");

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

function fillSpeakers(speakers) {
    speakers.forEach(function (speaker, index) {
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
                    <img src="./img/${element.type}s/${element.nombre.toLowerCase()}.png" height=70/>
                </h5>
                <p class="text-gray py-2 mx-1 mx-lg-5 text-center">
                    ${element.slogan}
                </p>
            </div>
        </div>
        `);
    })
}

function fillAgenda(agenda) {
    agenda.forEach((element, index) => {
        $(`#agenda-container`).append(`<div class="container-fluid agenda p-3">
            <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-4 p-2">
                    <div class="text-center h-100 day-agenda d-flex flex-column justify-content-center align-items-center">
                        <p class="fw-bold" style="font-size: 4rem;">${element.dia}</p>
                        <p class="bg-main text-white fw-bold px-3" style="font-size: 2rem;">Nov</p>
                    </div>
                </div>
                <div class="col-sm-12 col-md-8 col-lg-8 p-4 px-lg-5">
                    ${element.actividades.map((actividad, i) => {
                        return `<div class="horario">
                            <div class="d-flex align-items-center gap-2 py-1 fw-bold fs-5 position-relative">
                                ${i==1 ? `<div class="position-absolute top-0 bg-main start-0" style="width: 40px; height: 10px; transform: translateY(-100%);"></div>` : ''}
                                <i class="fa-solid fa-clock"></i>
                                ${actividad.inicio} - ${actividad.fin}
                            </div>
                            <div>
                                <p class="fw-bold">${actividad.nombre}</p>
                                <p>${actividad.detalles}</p>
                            </div>
                        </div>`
                    })}                    
                </div>
            </div>
        </div>`)
        if (index!=agenda.length-1) {
            $("#agenda-container").append(`
                <div class="container-fluid">
                    <div class="square bg-main m-auto" style="width: 40px; height: 40px;"></div>
                </div>
            `);
        }
    })
}

function fillEventos(speakers, event) {
    speakers.forEach((speaker) => {
        const eventos = speaker[event];
        if (eventos.length !== 0) {
            eventos.forEach((evento, index) => {
                $(`#${event}-container`).append(`
                    <div class="row agenda p-3 py-md-4 mb-3 mb-md-5">
                        <div class="col-sm-12 col-md-6 py-3 py-md-0 px-md-4 day-agenda">
                            <img src="./img/speakers/${formatSpeakerName(speaker.nombres, speaker.apellidos)}" width=150 alt="user" class="img-fluid rounded-circle d-block m-auto">                            
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
                        <div class="col-sm-12 col-md-6 py-3 py-md-0 px-md-4 d-flex flex-column align-items-start">
                            <h5 class="text-main fw-bold mb-4">${evento.nombre}</h5>
                            <p class="mb-4">${evento.detalles}</p>
                            <div class="text-main flex-grow-1">
                                <div class="d-flex gap-2 align-items-center">
                                    <i class="fa-solid fa-calendar"></i>
                                    ${evento.dia}/11
                                </div>
                                <div class="d-flex gap-2 align-items-center">
                                    <i class="fa-solid fa-clock"></i>
                                    ${evento.inicio} - ${evento.fin}
                                </div>
                                <div class="d-flex gap-2 align-items-center">
                                    <i class="fa-solid fa-location-dot"></i>
                                    ${evento.lugar}
                                </div>
                            </div>
                            <a href="#" class="btn btn-main my-3 py-1 px-5 rounded rounded-pill">Inscribirme</a>
                        </div>
                    </div>    
                `);
            })
        }
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