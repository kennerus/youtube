'use strict';

class AddVideo {
  constructor(videoContainer) {
    this.videoContainer = document.getElementById(videoContainer);
    // this.addVideo = this.httpRequest(link);
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
    const modal = document.querySelector(`.${appendTo}`);
    const element = document.createElement(elementType);
    element.className = className;
    element.innerHTML = innerHtml;
    modal.appendChild(element);
  }

  /**
   * remove element
   *
   * @param className
   */
  removeElement(className) {
    const element = document.querySelector(`.${className}`);
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
        'onReady': this.createElement('span', 'video_done', 'Видео успешно добавлено', 'modal__content'),
        'onError': this.createElement('span', 'video_error', 'Произошла ошибка', 'modal__content')
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
    let postAjax = new XMLHttpRequest();

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
   * add video on the page
   *
   * @param link
   */
  addVideoOnPage(link) {
    const videoId = this.getYoutubeId(link);
    this.onYouTubeIframeAPIReady(videoId);
  }
}
