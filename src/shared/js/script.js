'use strict';

class AddVideo {
  constructor(input, videoContainer) {
    this.input = document.querySelector('.' + input);
    this.videoContainer = document.getElementById(videoContainer);
  }

  getYoutubeId(link) {
    let videoId;

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

  createElement(elementType, className, innerHtml, appendTo) {
    const element = document.createElement(elementType);
    element.className = className;
    element.innerHTML = innerHtml;

  }

  httpRequest() {
    const videoId = this.getYoutubeId();
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
      statusBox.classList.add('modalVideo__status-box_error');
      statusBox.innerHTML = 'Произошла ошибка!';
      setTimeout(function () {
        closeBtn.click();
      }, 3000);
    } else {
      // вывести результат
      const youtubeData = JSON.parse(xhr.responseText);
      inputVideoId.setAttribute('value', video_id);
      inputVideoTitle.setAttribute('value', youtubeData.items[0].snippet.title);
      inputVideoDesc.innerHTML = youtubeData.items[0].snippet.description;

      // проверка есть ли видео на странице редактирования
      if (videoContainer.classList.contains('form-lms__video_exist')) {
        const videoContainerDiv = document.createElement('div');
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
}
