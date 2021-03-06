'use strict';

class ParseYoutubeVideo {
  constructor(initData) {
    const init = initData || {};
    this.initData = {
      videoContainer: init.videoContainer || 'video',
      successElementType: init.successElementType || 'span',
      successElementClass: init.successElementClass || 'video_done',
      successElementHtml: init.successElementHtml || 'Видео успешно добавлено',
      successElementAppendTo: init.successElementAppendTo || '',
      customMethod: init.customMethod || function() {

      }
    };

    this.videoContainer = document.getElementById(this.initData.videoContainer);
  }

  /**
   * get video id from youtube link
   *
   * @param link
   * @returns {string}
   */
  getYoutubeId(link) {
    let videoId;
    if (link.indexOf('.be/') !== -1) {
      videoId = link.split('https://youtu.be/')[1];
      return videoId;
    } else {
      videoId = link.split('v=')[1];
      let ampersandPosition = videoId.indexOf('&');

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
  createElement(elementType, className, innerHtml, appendTo) {
    const modal = document.querySelector(appendTo);
    const element = document.createElement(elementType);
    element.className = className;
    element.innerHTML = innerHtml;
    modal.appendChild(element);
  }

  /**
   * remove element
   *
   * @param el
   */
  removeElement(el) {
    const element = document.querySelector(`.${el}`) || document.querySelector(`#${el}`);
    element.remove();
  }

  /**
   * adding iframe to div
   *
   * @param videoId
   */
  onYouTubeIframeAPIReady(videoId) {
    const player = new YT.Player(this.videoContainer, {
      height: '360',
      width: '640',
      videoId: videoId,
      events: {
        'onReady': this.createElement(
          this.initData.successElementType,
          this.initData.successElementClass,
          this.initData.successElementHtml,
          this.initData.successElementAppendTo
        ),
      }
    });
  }

  /**
   * request to google api. gives all info about video
   *
   * @param link
   */
  httpRequest(link) {
    const videoId = this.getYoutubeId(link);
    const apiURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=AIzaSyCHT9pNb7goNLOj_VHACnp4PgWtgzUpwPw';

    // 1. Создаём новый объект XMLHttpRequest
    let xhr = new XMLHttpRequest();

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
      const youtubeData = JSON.parse(xhr.responseText);
      console.log(youtubeData);
    }
  }

  /**
   * add video to the page
   *
   * @param link
   */
  addVideoOnPage(link) {
    const videoId = this.getYoutubeId(link);
    this.onYouTubeIframeAPIReady(videoId);

    setTimeout(() => {
      this.removeElement(this.initData.successElementClass);
    }, 3000)
  }
}
