'use strict';

class Modal {
  constructor(modalOpenSelector, modalCloseSelector, modalSelector, activeModalSelector) {
    this.modalOpenSelector = modalOpenSelector;
    this.modalCloseSelector = modalCloseSelector;
    this.activeModalSelector = activeModalSelector;
    this.modalSelector = modalSelector;

    this.init();
  }

  init() {
    const openButton = document.querySelector(this.modalOpenSelector);
    const closeButton = document.querySelector(this.modalCloseSelector);
    const modal = document.querySelector(this.modalSelector);

    openButton.addEventListener('click', () => {
      modal.classList.add(this.activeModalSelector);
    });

    closeButton.addEventListener('click', () => {
      modal.classList.remove(this.activeModalSelector);
    });
  };
}
