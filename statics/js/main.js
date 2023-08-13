const AVATAR_API_URL = "https://api.lanyard.rest/v1/users/961518819208220682";
const hamburguer = $('.hamburguer')

let lastDiscordStatus = null;
let isSidebarVisible = false;

function fetchAvatar() {
    return fetch(`${AVATAR_API_URL}?_=${Date.now()}`)
        .then(response => response.json())
        .then(({ data }) => data)
        .catch(error => {
            console.error("Error al obtener la imagen del avatar de Discord:", error);
            return null;
        });
}

async function showDiscordAvatar() {
    try {
        const data = await fetchAvatar();
        if (!data) return;

        const { discord_status, discord_user } = data;
        if (discord_status !== lastDiscordStatus) {
            lastDiscordStatus = discord_status;

            const $avatarDiscord = $('.avatar-discord');
            const $discordContainer = $('.discord-container');
            const $statusText = $discordContainer.find('p');

            if (discord_status === "online" && discord_user) {
                const avatarImage = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`;
                $avatarDiscord.attr('src', avatarImage).fadeIn();
                $statusText.text('Conectado');
                $discordContainer.addClass('online').removeClass('offline');
            } else {
                $avatarDiscord.fadeOut();
                $statusText.text('Desconectado');
                $discordContainer.addClass('offline').removeClass('online');
            }
        }
    } catch (error) {
        console.error("Error al obtener la imagen del avatar de Discord:", error);
    }
}

function toggleSidebar() {
    const mobileSidebar = $('.side-bar');
    mobileSidebar.animate({ left: isSidebarVisible ? '-110%' : '0%' });
    isSidebarVisible ? hamburguer.removeClass('active-hamburguer') : hamburguer.addClass('active-hamburguer')
    isSidebarVisible = !isSidebarVisible;
}

function scrollToSection(section) {
    const bodySectionScroll = $('.' + section).closest('body');
    bodySectionScroll.animate({
        scrollTop: $('.' + section).offset().top - bodySectionScroll.offset().top + bodySectionScroll.scrollTop()
    }, 500);
}

function countTo(target, duration, element) {
    const start = parseInt($(element).data("from"));
    const increment = Math.ceil((target - start) / duration);
    let current = start;

    const interval = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            clearInterval(interval);
            current = target;
        }
        $(element).text(current);
    }, 10);
}

window.addEventListener('load', function (e) {
    // Funciones iniciales
    showDiscordAvatar();
    setInterval(showDiscordAvatar, 10000);
    $('.loader').addClass('close-loader');

    // Contador
    $("[data-from]").each(function () {
        const target = parseInt($(this).data("to"));
        countTo(target, 200, this);
    });

    // Abrir y cerrar menú
    hamburguer.on('click', toggleSidebar);

    // Secciones scroll
    const mainSections = ['home-grid', 'experience', 'projects'];
    mainSections.forEach(section => {
        $(`[${section}]`).on('click', () => {
            scrollToSection(section);
            if (isSidebarVisible) toggleSidebar();
        });
    });

    // Multi-idiomas
    $('[lang-button]').on('click', function () {
        iziToast.error({ timeout: 3000, icon: 'x icon', title: 'Función invalida', message: 'Lo siento, el cambio de lenguaje aún no está disponible.' });
    });
});
