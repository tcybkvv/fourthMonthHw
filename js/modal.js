const modalTrigger = document.querySelector('#btn-get');
const modal = document.querySelector('.modal');
const modalCloseTrigger = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflowY = 'hidden';
}

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflowY = '';
}

modalTrigger.onclick = openModal;
modalCloseTrigger.onclick = closeModal;
modal.onclick = e => (e.target === modal) && closeModal();

const openModalAfterSecs = () => {
    setTimeout(() => {
        openModal()
    }, 10000)
}
openModalAfterSecs()

const scrollFunc = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        openModal()
        window.removeEventListener('scroll', scrollFunc)
    }
}
window.addEventListener('scroll', scrollFunc)

