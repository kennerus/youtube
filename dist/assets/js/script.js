'use strict';

let _createClass = function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      let descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

let AddVideo = function () {
  function AddVideo(input, videoContainer) {
    _classCallCheck(this, AddVideo);

    this.input = document.querySelector('.' + input);
    this.videoContainer = document.getElementById(videoContainer);
  }

  _createClass(AddVideo, [{
    key: 'getYoutubeId',
    value: function getYoutubeId() {
      let videoId = void 0;

      if (this.input.value.indexOf('.be/') !== -1) {
        videoId = this.input.value.split('https://youtu.be/')[1];
        return videoId;
      } else {
        videoId = this.input.value.split('v=')[1];
        let ampersandPosition = videoId.indexOf('&');

        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
      }
    }
  }, {
    key: 'httpRequest',
    value: function httpRequest() {
      let videoId = this.getYoutubeId();
      let apiURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=AIzaSyCHT9pNb7goNLOj_VHACnp4PgWtgzUpwPw';

      // 1. Создаём новый объект XMLHttpRequest
      let xhr = new XMLHttpRequest();
      let postAjax = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', apiURL, false);

      // 3. Отсылаем запрос
      xhr.send();

      // 4. Если код ответа сервера не 200, то это ошибка
      if (xhr.status != 200) {
        // обработать ошибку
        //console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
        statusBox.classList.add('modalVideo__status-box_error');
        statusBox.innerHTML = 'Произошла ошибка!';
        setTimeout(function () {
          closeBtn.click();
        }, 3000);
      } else {
        // вывести результат
        let youtubeData = JSON.parse(xhr.responseText);
        inputVideoId.setAttribute('value', video_id);
        inputVideoTitle.setAttribute('value', youtubeData.items[0].snippet.title);
        inputVideoDesc.innerHTML = youtubeData.items[0].snippet.description;

        // проверка есть ли видео на странице редактирования
        if (videoContainer.classList.contains('form-lms__video_exist')) {
          let videoContainerDiv = document.createElement('div');
          videoContainerDiv.className = 'form-lms__video_exist';
          videoContainerDiv.setAttribute('id', 'player');
          videoParent.insertBefore(videoContainerDiv, videoContainer);
          videoContainer.remove();
        }
        callYoutube('player', video_id);
        // onYouTubeIframeAPIReady(video_id, 'player');
        isAvailable.innerHTML = 'Видео: ' + youtubeData.items[0].snippet.title;
        statusBox.classList.add('modalVideo__status-box_success');
        statusBox.innerHTML = 'Видео успешно добавлено!';

        setTimeout(function () {
          closeBtn.click();
        }, 3000);
      }
    }
  }]);

  return AddVideo;
}();

let openModalBtn = document.querySelector('.js_openModal');
let closeModal = document.querySelector('.js_closeModal');
let modal = document.querySelector('.js_modal');

openModalBtn.addEventListener('click', function () {
  modal.classList.add('modal_opened');
});

closeModal.addEventListener('click', function () {
  modal.classList.remove('modal_opened');
});
//# sourceMappingURL=script.js.map
