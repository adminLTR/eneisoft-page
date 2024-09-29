$(document).ready(function () {
    fillSpeakers(speakers);
    fillAliados(aliados_sponsors);
});

function fillSpeakers(speakers) {
    speakers.forEach(function (speaker) {
        $("#speakers-container").append(`
            <div class="col-sm-12 col-md-6 p-5">
                <div class="bg-black p-4">
                    <img src="${speaker.foto}" alt="user" class="img-fluid rounded-circle d-block m-auto">
                    <h5 class="my-3 text-white d-flex align-items-center gap-2">
                        ${speaker.nombres} ${speaker.apellidos}
                        <img width="30" height="30" src="https://img.icons8.com/emoji/48/${speaker.pais}-emoji.png" alt="${speaker.pais}-emoji"/>
                    </h5>
                    <p class="text-gray my-3">${speaker.perfil}</p>
                    <div class="d-flex justify-content-start align-items-center gap-2">
                        ${Object.keys(speaker.social_media).map(social => {
                            return `<a class="text-decoration-none" href="${speaker.social_media[social]}">
                                <div class="social-media">
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
        $(`#${element.type}s-container`).append(`<div class="col-sm-12 col-md-6 col-lg-4 p-5 px-md-2">
            <div class="text-center px-2">
                <h5 class="text-white d-flex justify-content-center align-items-center gap-2 fs-4 fw-bold text-nowrap">
                    ${element.logo}
                    ${element.nombre ?? ''}
                </h5>
                <p class="text-gray py-2 mx-1 mx-lg-5 text-center">
                    ${element.slogan}
                </p>
            </div>
        </div>
        `);
    })
}