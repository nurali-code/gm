document.querySelectorAll('.faq__heading').forEach(el => {
    el.addEventListener('click', () => {
        const isActive = el.classList.toggle('active');
        document.querySelectorAll('.faq__heading').forEach(other => {
            if (other !== el) {
                other.classList.remove('active');
                slideUp(other.nextElementSibling, 300);
            }
        });
        isActive ? slideDown(el.nextElementSibling, 300) : slideUp(el.nextElementSibling, 300);
    });
});


const rocket = document.getElementById('rocket');
const triggerElement = document.querySelector('aside');
const scrollFactor = -0.6;
function updateRocketPosition() {
    if (!rocket || !triggerElement) { return; }
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const startOffset = viewportHeight * 0.45;
    const animationStartScrollY = triggerElement.offsetTop + startOffset;
    const animationEndScrollY = triggerElement.offsetTop + triggerElement.offsetHeight;
    const animationDistance = Math.max(0, animationEndScrollY - animationStartScrollY);
    const totalTranslateY = animationDistance * scrollFactor;
    let translateY;
    if (animationDistance <= 0) { translateY = 0; }
    else if (scrollY <= animationStartScrollY) { translateY = 0; }
    else if (scrollY >= animationEndScrollY) { translateY = totalTranslateY; }
    else {
        const scrollProgress = (scrollY - animationStartScrollY) / animationDistance;
        translateY = totalTranslateY * scrollProgress;
    }
    window.requestAnimationFrame(() => { if (rocket) { rocket.style.transform = `translateY(${translateY}px)`; } });
}
if (triggerElement && window.innerWidth > 720) {
    updateRocketPosition();
    window.addEventListener('scroll', updateRocketPosition);
} else {
    console.error("Trigger element for rocket animation ('aside') not found!");
}

function _clear(el, props) {
    props.forEach(p => el.style.removeProperty(p));
}

function slideUp(el, d = 400) {
    el.style.height = el.offsetHeight + 'px';
    el.style.transition = `height ${d}ms, margin ${d}ms, padding ${d}ms`;
    el.style.overflow = 'hidden';
    el.offsetHeight;
    ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
        .forEach(p => (el.style[p] = 0));
    setTimeout(() => {
        el.style.display = 'none';
        _clear(el, [
            'height',
            'padding-top',
            'padding-bottom',
            'margin-top',
            'margin-bottom',
            'overflow',
            'transition'
        ]);
    }, d);
}

function slideDown(el, d = 400) {
    el.style.removeProperty('display');
    let display = getComputedStyle(el).display;
    if (display === 'none') display = 'block';
    el.style.display = display;

    const original = {
        paddingTop: getComputedStyle(el).paddingTop,
        paddingBottom: getComputedStyle(el).paddingBottom,
        marginTop: getComputedStyle(el).marginTop,
        marginBottom: getComputedStyle(el).marginBottom
    };

    const height = el.offsetHeight;

    el.style.overflow = 'hidden';
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    el.offsetHeight;

    el.style.transition = `height ${d}ms, margin ${d}ms, padding ${d}ms`;
    el.style.height = height + 'px';
    el.style.paddingTop = original.paddingTop;
    el.style.paddingBottom = original.paddingBottom;
    el.style.marginTop = original.marginTop;
    el.style.marginBottom = original.marginBottom;

    setTimeout(() => {
        _clear(el, [
            'height', 'overflow', 'transition',
            'padding-top', 'padding-bottom',
            'margin-top', 'margin-bottom'
        ]);
    }, d);
}

function slideToggle(el, d = 400) {
    getComputedStyle(el).display === 'none'
        ? slideDown(el, d)
        : slideUp(el, d);
}

// Обработка отображения предупреждения для USDT/USDC
const currencyInputs = document.querySelectorAll('input[name="currency"]');
const quoteBlock = document.querySelector('.hero__quote');

function toggleQuoteVisibility() {
    const selectedCurrency = document.querySelector('input[name="currency"]:checked').value;
    if ((selectedCurrency === 'USDT' || selectedCurrency === 'USDC')) {
        getComputedStyle(quoteBlock).display === 'none' ? slideDown(quoteBlock, 300) : '';
    } else { slideUp(quoteBlock, 300); }
}

currencyInputs.forEach(input => {
    input.addEventListener('change', toggleQuoteVisibility);
});

toggleQuoteVisibility();
