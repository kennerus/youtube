let addVideo = new AddVideo('js_input', 'video');
const input = document.querySelector('.js_input');

input.oninput = function () {
  addVideo.httpRequest(input.value);
};

