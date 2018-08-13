window.onload = function () {
  if (document.querySelector('.js_videoId') && document.querySelector('.js_videoId').value !== '') {
    const inputVideoId = document.querySelector('.js_videoId');
    const videoId = inputVideoId.value;
    let player;
    callYoutube('player', videoId);
  }

  function callYoutube(containerId, videoId) {
    player = new YT.Player(containerId, {
      width: '100%',
      videoId: videoId,
    });
  }

  if (document.querySelector('.js_modal')) {
    const modal = document.querySelector('.js_modal');
    const openBtn = document.querySelector('.js_videoModal');
    const closeBtn = document.querySelector('.js_modalClose');
    const videoLinkInput = document.querySelector('.js_videoLink');
    const inputVideoTitle = document.querySelector('.js_videoTitle');
    const inputVideoDesc = document.querySelector('.js_videoDesc');
    const isAvailable = document.querySelector('.js_isVideoAvailable');
    const statusBox = document.querySelector('.js_statusBox');
    const videoParent = document.querySelector('.js_videoParent');
    let videoContainer;
    // const inputVideoId = document.querySelector('.js_videoId');
    // const videoId = inputVideoId.value;

    // открываем модалки, чистим от всего, что было введено ранее
    openBtn.addEventListener('click', function () {
      document.querySelector('.js-page-main').classList.toggle('zIndex');
      modal.classList.add('modalVideo_opened');
      videoLinkInput.value = '';
      statusBox.classList.remove('modalVideo__status-box_error');
      statusBox.classList.remove('modalVideo__status-box_success');
      statusBox.innerHTML = '';
    });

    closeBtn.addEventListener('click', function () {
      modal.classList.remove('modalVideo_opened');
      document.querySelector('.js-page-main').classList.remove('zIndex');
    });
    // https://youtu.be/TuNuNmQ3oOE

    function getYoutubeId() {
      if (videoLinkInput.value.indexOf('.be/') !== -1) {
        let video_id = videoLinkInput.value.split('https://youtu.be/')[1];
        return video_id;
      } else {
        let video_id = videoLinkInput.value.split('v=')[1];
        let ampersandPosition = video_id.indexOf('&');

        if (ampersandPosition !== -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
      }
    }

    // при загрузке всего контента подставляем видео или, если видео нету, загружаем своё через модалку
    videoLinkInput.oninput = function () {
      const inputVideoId = document.querySelector('.js_videoId');
      videoContainer = document.getElementById('player');
      let video_id = getYoutubeId();

      const apiURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + video_id + '&key=AIzaSyCHT9pNb7goNLOj_VHACnp4PgWtgzUpwPw';

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
};
