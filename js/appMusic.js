// get element from DOM
function getElement(selection) {
	const element = document.querySelector(selection);

	if (element) {
		return element;
	}
	throw new Error(
		`Please check ${selection} selector, no such element exists`
	);
}
const trackName = getElement('#js-album-infoName');
const trackSinger = getElement('#js-album-infoArtist');
const trackThumb = getElement('.player-cover__item');
const trackURL = getElement('#audio');
const progress = getElement('#js-audioRange');

const playBtn = getElement('#play');
const playIcon = getElement('.fa-play');
const pauseIcon = getElement('.fa-pause');
const playStatus = getElement('.player');
const progressBar = getElement('.player-bar');

const nextBtn = getElement('#next');
const prevBtn = getElement('#backward');

const playlistDOM = getElement('.playlist');
const dashboard = getElement('.dashboard');
const btnPlaylist = getElement('.btn-playlist .fa-sliders');
const btnPlaylistClose = getElement('.btn-playlist .fa-xmark');

/* --------------------------- get tracks from API -------------------------- */

const trackAPI = '/data/tracks.json';
function getTracks() {
	fetch(trackAPI)
		.then((res) => res.json())
		.then((data) => loadTracks(data.tracks));
}
let currentIndex = 0;

function loadTracks(trackData) {
	console.log(trackData);
	renderTracks(trackData);
	loadCurrentTrack(trackData);
}

getTracks();

function loadCurrentTrack(trackData) {
	let currentTrack = trackData[currentIndex];

	trackName.textContent = currentTrack.title;
	trackSinger.textContent = currentTrack.artist;
	trackURL.src = currentTrack.path;
	// sectionOne.style.backgroundImage = `url('${this.currentTrack.imgUrl}')`;
	trackThumb.style.backgroundImage = `url('${currentTrack.imgUrl}')`;

	console.log(audio.duration);
	const trackThumbAnimate = trackThumb.animate(
		[{ transform: 'rotate(360deg)' }],
		{
			duration: 10000,
			iterations: Infinity,
		}
	);

	trackThumbAnimate.pause();

	playIcon.onclick = function () {
		audio.play();
		audio.onplay = function () {
			// _this.isPlaying = true;
			playIcon.style.display = 'none';
			pauseIcon.style.display = 'flex';
			playStatus.classList.add('playing');
			trackThumbAnimate.play(audio.duration);
			// progressBarAnimate.play();
			progressBar.classList.add('progressBar');
		};
	};

	pauseIcon.onclick = function () {
		audio.pause();
		audio.onpause = function () {
			// _this.isPlaying = false;
			playIcon.style.display = 'flex';
			pauseIcon.style.display = 'none';
			playStatus.classList.remove('playing');
			trackThumbAnimate.pause();
			// progressBarAnimate.pause();
			progressBar.classList.remove('progressBar');
		};
	};

	// track time bars
	audio.ontimeupdate = function () {
		if (audio.duration) {
			const progressPercent = Math.floor(
				(audio.currentTime / audio.duration) * 100
			);

			progress.value = progressPercent;
			// console.log(audio.duration);
			progressBar.style.animationDuration = `${audio.duration}s`;
		}
	};

	progress.onchange = function (e) {
		const seekTime = (audio.duration / 100) * e.target.value;
		audio.currentTime = seekTime;
	};

	audio.onended = function () {
		// if (_this.isRepeat) {
		//     audio.play();
		// } else {
		// }
		nextBtn.click();
	};
    nextBtn.addEventListener('click', function () {
        currentIndex++;
        // if (currentIndex > tracks.length - 1) {
        // 	currentIndex = 0;
        // }
        loadCurrentTrack(currentIndex);
        console.log(currentIndex)
    });
}



// toggle playlist
btnPlaylist.addEventListener('click', function () {
	dashboard.classList.remove('hide-playlist');
	btnPlaylist.style.display = 'none';
	btnPlaylistClose.style.display = 'flex';
	dashboard.classList.add('show-playlist');
});

btnPlaylistClose.addEventListener('click', function () {
	dashboard.classList.remove('show-playlist');
	btnPlaylistClose.style.display = 'none';
	btnPlaylist.style.display = 'flex';
	dashboard.classList.add('hide-playlist');
});

// render tracks to playlist
function renderTracks(trackData) {
	const track = trackData.map((item, index) => {
		return `
            <div 
            class="track ${index === currentIndex ? 'active' : ''}" 
            data-index="${index}">
                <p class="track-item">${item.title} - ${item.artist}</p>
            </div>        
        `;
	});
	playlistDOM.innerHTML = track.join('');
}
