let addVideo = new ParseYoutubeVideo({
  successElementAppendTo: '#root'
});
const input = document.querySelector('.js_input');
const addVideoBtn = document.querySelector('.js_addVideo');

addVideoBtn.addEventListener('click', () => {
  const inputValue = input.value;
  addVideo.addVideoOnPage(inputValue);
});
