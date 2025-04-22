const qbtn = document.querySelectorAll('.faq__heading');
qbtn.forEach(el => {
    el.addEventListener('click', function () {
        qbtn.forEach(elm => { elm.classList.remove('active') })
        el.classList.add('active')
    })
})