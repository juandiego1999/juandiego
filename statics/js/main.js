window.addEventListener('load', function (e) {

    const sections = ['about-me', 'skills', 'experience', 'projects', 'contact'];
    const mobileMenu = $('.mobile-hamburger');
    const mobileMenuIcon = mobileMenu.find('img');
    const mobileSidebar = $('.side-bar');
    const landButton = $('[lang-button]')

    $.each(sections, function (index, section) {
        $('[' + section + ']').on('click', function () {
            let container = $('.' + section).closest('.content-page');
            container.animate({
                scrollTop: $('.' + section).offset().top - container.offset().top + container.scrollTop()
            }, 500);
    
            // Agregar esta línea para cerrar el menú si está abierto
            if (mobileSidebar.css('left') !== '-1100px') {
                mobileSidebar.animate({ left: '-1100px' });
                mobileMenuIcon.attr('src', 'statics/images/icons/open.svg');
            }
        });
    });

    mobileMenu.on('click', function () {
        const isHidden = mobileSidebar.css('left') === '-1100px';
        mobileSidebar.animate({ left: isHidden ? '0px' : '-1100px' });
        mobileMenuIcon.attr('src', isHidden ? 'statics/images/icons/close.svg' : 'statics/images/icons/open.svg');
    });

    landButton.on('click', function () {
        iziToast.error({ timeout: 3000, icon: 'x icon', title: 'Función invalida', message: 'Lo siento, el cambio de lenguaje aún no está disponible.' });
    });

})