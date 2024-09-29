$(document).ready(function () {
    fillSpeakers(speakers)
});

function fillSpeakers(speakers) {
    speakers.forEach(function (speaker) {
        $("#speakers-container").append(`
            <div class="col-sm-12 col-md-6 p-5">
                <div class="bg-black p-4">
                    <img src="${speaker.foto}" alt="user" class="img-fluid rounded-circle d-block m-auto">
                    <h5 class="my-4 text-white">${speaker.nombres} ${speaker.apellidos}</h5>
                    <p class="text-gray">${speaker.perfil}</p>
                    <div class="d-flex justify-content-start align-items-center gap-2">
                        ${Object.keys(speaker.social_media).map(social => {
                            return `<a class="text-decoration-none" href="${speaker.social_media[social]}">
                                <div class="social-media">
                                    <i class="fa-brands fa-${social}"></i>
                                </div>
                            </a>`
                        })}
                    </div>
                </div>
            </div>
        `)
    })
}