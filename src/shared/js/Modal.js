'use strict';

class Modal {
  constructor(modalOpenSelector, modalCloseSelector, modalSelector, activeModalSelector) {
    this.modalOpenSelector = modalOpenSelector;
    this.modalCloseSelector = modalCloseSelector;
    this.activeModalSelector = activeModalSelector;
    this.modalSelector = modalSelector;
    this.isModalOpened = false;
  }

  /**
   * decide what selector using atm
   *
   * @param selector
   * @returns {*}
   */
  whatSelectorInUse(selector) {
    switch(selector) {
      case document.querySelector(selector):
        return document.querySelector(selector);
      case document.querySelector(`.${selector}`):
        return document.querySelector(`.${selector}`);
      case document.querySelector(`#${selector}`):
        return document.querySelector(`#${selector}`);
      case document.querySelector(`[${selector}]`):
        return document.querySelector(`[${selector}]`);
      default:
        console.log('Something went wrong.');
    }
  }

  toggleModal() {
    const openButton = this.whatSelectorInUse(this.modalOpenSelector);
    const closeButton = this.whatSelectorInUse(this.modalCloseSelector);
    const modal = this.whatSelectorInUse(this.modalSelector);

    openButton.addEventListener('click', function () {
      modal.classList.add(this.activeModalSelector);
    });

    closeButton.addEventListener('click', function () {
      modal.classList.remove(this.activeModalSelector);
    })
  };
}
