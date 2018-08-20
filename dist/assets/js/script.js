'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
  function Modal(modalOpenSelector, modalCloseSelector, modalSelector, activeModalSelector) {
    _classCallCheck(this, Modal);

    this.modalOpenSelector = modalOpenSelector;
    this.modalCloseSelector = modalCloseSelector;
    this.activeModalSelector = activeModalSelector;
    this.modalSelector = modalSelector;

    this.init();
  }

  _createClass(Modal, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var openButton = document.querySelector(this.modalOpenSelector);
      var closeButton = document.querySelector(this.modalCloseSelector);
      var modal = document.querySelector(this.modalSelector);

      openButton.addEventListener('click', function () {
        modal.classList.add(_this.activeModalSelector);
      });

      closeButton.addEventListener('click', function () {
        modal.classList.remove(_this.activeModalSelector);
      });
    }
  }]);

  return Modal;
}();

'use strict';

var ParseYoutubeVideo = function () {
  function ParseYoutubeVideo(initData) {
    _classCallCheck(this, ParseYoutubeVideo);

    var init = initData || {};
    this.initData = {
      videoContainer: init.videoContainer || 'video',
      successElementType: init.successElementType || 'span',
      successElementClass: init.successElementClass || 'video_done',
      successElementHtml: init.successElementHtml || 'Видео успешно добавлено',
      successElementAppendTo: init.successElementAppendTo || '',
      customMethod: init.customMethod || function () {}
    };

    this.videoContainer = document.getElementById(this.initData.videoContainer);
  }

  /**
   * get video id from youtube link
   *
   * @param link
   * @returns {string}
   */


  _createClass(ParseYoutubeVideo, [{
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

    /**
     *
     * create element and append it
     *
     * @param elementType
     * @param className
     * @param innerHtml
     * @param appendTo
     */

  }, {
    key: 'createElement',
    value: function createElement(elementType, className, innerHtml, appendTo) {
      var modal = document.querySelector(appendTo);
      var element = document.createElement(elementType);
      element.className = className;
      element.innerHTML = innerHtml;
      modal.appendChild(element);
    }

    /**
     * remove element
     *
     * @param el
     */

  }, {
    key: 'removeElement',
    value: function removeElement(el) {
      var element = document.querySelector('.' + el) || document.querySelector('#' + el);
      element.remove();
    }

    /**
     * adding iframe to div
     *
     * @param videoId
     */

  }, {
    key: 'onYouTubeIframeAPIReady',
    value: function onYouTubeIframeAPIReady(videoId) {
      var player = new YT.Player(this.videoContainer, {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
          'onReady': this.createElement(this.initData.successElementType, this.initData.successElementClass, this.initData.successElementHtml, this.initData.successElementAppendTo)
        }
      });
    }

    /**
     * request to google api. gives all info about video
     *
     * @param link
     */

  }, {
    key: 'httpRequest',
    value: function httpRequest(link) {
      var videoId = this.getYoutubeId(link);
      var apiURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=AIzaSyCHT9pNb7goNLOj_VHACnp4PgWtgzUpwPw';

      // 1. Создаём новый объект XMLHttpRequest
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', apiURL, false);

      // 3. Отсылаем запрос
      xhr.send();

      // 4. Если код ответа сервера не 200, то это ошибка
      if (xhr.status != 200) {
        // обработать ошибку
        console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
      } else {
        // вывести результат
        var youtubeData = JSON.parse(xhr.responseText);
        console.log(youtubeData);
      }
    }

    /**
     * add video to the page
     *
     * @param link
     */

  }, {
    key: 'addVideoOnPage',
    value: function addVideoOnPage(link) {
      var _this2 = this;

      var videoId = this.getYoutubeId(link);
      this.onYouTubeIframeAPIReady(videoId);

      setTimeout(function () {
        _this2.removeElement(_this2.initData.successElementClass);
      }, 3000);
    }
  }]);

  return ParseYoutubeVideo;
}();

var addVideo = new ParseYoutubeVideo({
  successElementAppendTo: '#root'
});
var input = document.querySelector('.js_input');
var addVideoBtn = document.querySelector('.js_addVideo');

addVideoBtn.addEventListener('click', function () {
  var inputValue = input.value;
  addVideo.addVideoOnPage(inputValue);
});
//# sourceMappingURL=script.js.map
