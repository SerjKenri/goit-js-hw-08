import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate',  throttle( e => {
    localStorage.setItem(STORAGE_KEY, e.seconds);
    }, 1000)
    );

player
.setCurrentTime(localStorage.getItem(STORAGE_KEY))
.catch(function (error) {
    console.error(error);
});