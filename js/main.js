(function () {
    'use strict';

    /* ═══ NAVBAR SCROLL ═══ */
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scroll-top');

    function onScroll() {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle('scrolled', y > 60);
        if (scrollTop) scrollTop.classList.toggle('visible', y > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ═══ MOBILE NAV ═══ */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ═══ SCROLL TO TOP ═══ */
    if (scrollTop) {
        scrollTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ═══ SCROLL ANIMATIONS ═══ */
    var animated = document.querySelectorAll('[data-animate]');
    if (animated.length && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var delay = entry.target.getAttribute('data-animate') || 0;
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        animated.forEach(function (el) { observer.observe(el); });
    }

    /* ═══ COOKIE BANNER ═══ */
    var cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        if (localStorage.getItem('cookies-accepted') !== null) {
            cookieBanner.hidden = true;
        }
        var acceptBtn = document.getElementById('cookie-accept');
        var rejectBtn = document.getElementById('cookie-reject');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function () {
                localStorage.setItem('cookies-accepted', 'true');
                cookieBanner.hidden = true;
            });
        }
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function () {
                localStorage.setItem('cookies-accepted', 'false');
                cookieBanner.hidden = true;
            });
        }
    }

    /* ═══ HERO COUNTER ANIMATION ═══ */
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(function (el) { counterObserver.observe(el); });
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1500;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
    }

})();
