const openModalBtn = document.querySelector('.js_openModal');
const closeModal = document.querySelector('.js_closeModal');
const modal = document.querySelector('.js_modal');

openModalBtn.addEventListener('click', function () {
  modal.classList.add('modal_opened');
});

closeModal.addEventListener('click', function () {
  modal.classList.remove('modal_opened');
});
