let addVideo = new ParseYoutubeVideo();
const input = document.querySelector('.js_input');
let modal = new Modal('.js_openModal', '.js_closeModal', '.js_modal', 'modal_opened');

input.oninput = function () {
  addVideo.addVideoOnPage(input.value);
};

