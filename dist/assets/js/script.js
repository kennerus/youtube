'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddVideo = function () {
  function AddVideo(input, videoContainer) {
    _classCallCheck(this, AddVideo);

    this.videoContainer = document.getElementById(videoContainer);
  }

  _createClass(AddVideo, [{
    key: 'getYoutubeId',
    value: function getYoutubeId(link) {
      var videoId = void 0;
      if (link.indexOf('.be/') !== -1) {
        videoId = link.split('https://youtu.be/')[1];
        return videoId;
      } else {
        videoId = link.split('v=')[1];
        var ampersandPosition = videoId.indexOf('&');

        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
      }
    }
  }, {
    key: 'createElement',
    value: function createElement(elementType, className, innerHtml, appendTo) {
      var modal = document.querySelector('.' + appendTo);
      var element = document.createElement(elementType);
      element.className = className;
      element.innerHTML = innerHtml;
      modal.appendChild(element);
    }
  }, {
    key: 'onYouTubeIframeAPIReady',
    value: function onYouTubeIframeAPIReady(videoId) {
      var player = new YT.Player(this.videoContainer, {
        height: '360',
        width: '640',
        videoId: videoId
      });
    }
  }, {
    key: 'httpRequest',
    value: function httpRequest(link) {
      var videoId = this.getYoutubeId(link);
      var apiURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=AIzaSyCHT9pNb7goNLOj_VHACnp4PgWtgzUpwPw';

      // 1. Создаём новый объект XMLHttpRequest
      var xhr = new XMLHttpRequest();
      var postAjax = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', apiURL, false);

      // 3. Отсылаем запрос
      xhr.send();

      // 4. Если код ответа сервера не 200, то это ошибка
      if (xhr.status != 200) {
        // обработать ошибку
        //console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
        this.createElement('span', 'video_error', 'Произошла ошибка', 'modal__content');
      } else {
        // вывести результат
        var youtubeData = JSON.parse(xhr.responseText);
        console.log(youtubeData);

        this.onYouTubeIframeAPIReady(videoId);

        // callYoutube('player', video_id);
        this.createElement('span', 'video_done', 'Видео успешно добавлено', 'modal__content');
      }
    }
  }]);

  return AddVideo;
}();

var addVideo = new AddVideo('js_input', 'video');
var input = document.querySelector('.js_input');

input.oninput = function () {
  addVideo.httpRequest(input.value);
};

var openModalBtn = document.querySelector('.js_openModal');
var closeModal = document.querySelector('.js_closeModal');
var modal = document.querySelector('.js_modal');

openModalBtn.addEventListener('click', function () {
  modal.classList.add('modal_opened');
});

closeModal.addEventListener('click', function () {
  modal.classList.remove('modal_opened');
});
//# sourceMappingURL=script.js.map
