'use strict';

class AddVideo {
  constructor(input, videoContainer) {
    this.videoContainer = document.getElementById(videoContainer);
  }

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

  createElement(elementType, className, innerHtml, appendTo) {
    const modal = document.querySelector(`.${appendTo}`);
    const element = document.createElement(elementType);
    element.className = className;
    element.innerHTML = innerHtml;
    modal.appendChild(element);
  }

  onYouTubeIframeAPIReady(videoId) {
    const player = new YT.Player(this.videoContainer, {
      height: '360',
      width: '640',
      videoId: videoId
    });
  }


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
      //console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
      this.createElement('span', 'video_error', 'Произошла ошибка', 'modal__content');
    } else {
      // вывести результат
      const youtubeData = JSON.parse(xhr.responseText);
      console.log(youtubeData);

      this.onYouTubeIframeAPIReady(videoId);

      // callYoutube('player', video_id);
      this.createElement('span', 'video_done', 'Видео успешно добавлено', 'modal__content');
    }
  }


}
