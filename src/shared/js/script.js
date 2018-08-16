let addVideo = new AddVideo('video');
const input = document.querySelector('.js_input');

input.oninput = function () {
  addVideo.addVideoOnPage(input.value);
};

