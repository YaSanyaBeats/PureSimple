const isMobile = document.documentElement.clientWidth < 768;
const isTablet = document.documentElement.clientWidth < 1140;

function isWebp() {
    // Проверка поддержки webp
    const testWebp = (callback) => {
        const webP = new Image();

        webP.onload = webP.onerror = () => callback(webP.height === 2);
        webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    // Добавление класса _webp или _no-webp для HTML
    testWebp((support) => {
        const className = support ? 'webp' : 'no-webp';
        document.querySelector('html').classList.add(className);
        console.log(support ? 'webp поддерживается' : 'webp не поддерживается');
    });
}

isWebp();

function setGradientBullets(swiper, paginationEl) {
    // Накладываем градиент на точки пагинации
    let bullets = [...paginationEl.querySelectorAll('.swiper-pagination-bullet')];
    let activeBullet = bullets.findIndex(bullet => {
        return bullet.classList.contains('swiper-pagination-bullet-active');
    });

    const opacityMaxLevel = 5;
    const maxOpacity = 80;
    const stepOpacity = maxOpacity / (opacityMaxLevel - 1);

    bullets.forEach((bullet, index) => {
        let deltaOpacity = Math.abs(index - activeBullet);
        let opacity = maxOpacity - stepOpacity * deltaOpacity;
        if(opacity <= 0) {
            opacity = 10;
        }
        bullet.style.opacity = '.' + opacity;
    });
}

function initSliders() {
    const heroSwiper = new Swiper('.hero__swiper', {
        loop: true,
        parallax: true,
        allowTouchMove: false,
        speed: 900,
        autoplay: {
            delay: 7000,
        },
        pagination: {
            el: '.hero__swiper-pagination',
            clickable: true,
        },
        on: {
            paginationUpdate: setGradientBullets
        },
    });

    const productsSwiper = new Swiper('.products-slider__swiper', {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 5,
        
        navigation: {
            prevEl: '.products-slider__nav-button_prev',
            nextEl: '.products-slider__nav-button_next'
        },
    });

    const categoriesSwiper = new Swiper('.categories-slider__swiper', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 5,
        
        navigation: {
            prevEl: '.categories-slider__nav-button_prev',
            nextEl: '.categories-slider__nav-button_next'
        },
    });

    const aboutSwiper = new Swiper('.about__swiper', {
        slidesPerView:'auto',
        spaceBetween: 5,
        
        pagination: {
            el: '.about__swiper-pagination',
            clickable: true,
        },
        on: {
            paginationUpdate: setGradientBullets
        },

        navigation: {
            prevEl: '.about__nav-button_prev',
            nextEl: '.about__nav-button_next'
        },
    });

    const whereSwiper = new Swiper('.where__swiper', {
        slidesPerView:'auto',
        centeredSlides: true,
        loop: true,
        loopAddBlankSlides: true,
        parallax: true,

        navigation: {
            prevEl: '.where__nav-button_prev',
            nextEl: '.where__nav-button_next'
        },
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    initSliders();
})