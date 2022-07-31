const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER_2';
const sectionOne = $('.section-row');
const playStatus = $('.player');
const playlist = $('.playlist');
const trackName = $('#js-album-infoName');
const trackSinger = $('#js-album-infoArtist');
const trackThumb = $('.player-cover__item');
const progressBar = $('.player-bar');

const playBtn = $('#play');
const playIcon = $('.fa-play');
const pauseIcon = $('.fa-pause');
const nextBtn = $('#next');
const prevBtn = $('#backward');
const randomBtn = $('#randomTrack');
const repeatBtn = $('#repeatTrack');
const favBtn = $('#favTrack');

const trackURL = $('#audio');
const progress = $('#js-audioRange');
const progressTime = $('.progress__time');
const progressDuration = $('.progress__duration');

const dashboard = $('.dashboard');
const btnPlaylist = $('.btn-playlist .fa-sliders');
const btnPlaylistClose = $('.btn-playlist .fa-xmark');

const app = {
    // reset
    currentIndex: 0,
	isPlaying: false,
	isRandom: false,
	isRepeat: false,

    // get isRandom and isRepeat value from localStorage
	config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    // tracks
    tracks: [
        {
			title: 'Torches',
			artist: 'Aimer',
			path: './assets/audio/18.mp3',
			imgUrl: './assets/audio/18.jpg',
		},
		{
			title: 'たぶん',
			artist: 'Yoasobi',
			path: './assets/audio/Tabun.mp3',
			imgUrl: './assets/audio/Tabun.jpg',
		},

		{
			title: 'Still Life',
			artist: 'Big Bang',
			path: './assets/audio/1.mp3',
			imgUrl: './assets/audio/1.jpg',
		},
		{
			title: 'Unstopable',
			artist: 'Sia',
			path: './assets/audio/2.mp3',
			imgUrl: './assets/audio/2.jpg',
		},
		{
			title: 'Runaway',
			artist: 'Aurora',
			path: './assets/audio/3.mp3',
			imgUrl: './assets/audio/3.jpg',
		},

		{
			title: 'In The End',
			artist: 'Linkin Park',
			path: './assets/audio/4.mp3',
			imgUrl: './assets/audio/4.jpg',
		},
		{
			title: 'Arcade',
			artist: 'Duncan Laurence',
			path: './assets/audio/5.mp3',
			imgUrl: './assets/audio/5.jpg',
		},
		{
			title: 'Waiting For Love',
			artist: 'AVICII',
			path: './assets/audio/6.mp3',
			imgUrl: './assets/audio/6.jpg',
		},
		{
			title: 'Life Goes On',
			artist: 'Oliver Tree',
			path: './assets/audio/7.mp3',
			imgUrl: './assets/audio/7.jpg',
		},
		{
			title: 'Numb',
			artist: 'Linkin Park',
			path: './assets/audio/8.mp3',
			imgUrl: './assets/audio/8.jpg',
		},
		{
			title: 'Counting Stars',
			artist: 'One Republic',
			path: './assets/audio/9.mp3',
			imgUrl: './assets/audio/9.jpg',
		},
		{
			title: 'Warriors',
			artist: 'Imagine Dragons',
			path: './assets/audio/10.mp3',
			imgUrl: './assets/audio/10.jpg',
		},
				{
			title: 'BlueBird',
			artist: 'IkimonoGakari',
			path: './assets/audio/11.mp3',
			imgUrl: './assets/audio/11.jpg',
		},

		{
			title: 'Closer',
			artist: 'Inoue Joe',
			path: './assets/audio/12.mp3',
			imgUrl: './assets/audio/12.jpg',
		},

		{
			title: 'I Can Hear',
			artist: 'DISH',
			path: './assets/audio/13.mp3',
			imgUrl: './assets/audio/13.jpg',
		},
				{
			title: 'Sparkle ',
			artist: 'Radwimps',
			path: './assets/audio/14.mp3',
			imgUrl: './assets/audio/14.jpg',
		},
						{
			title: 'Nandemonaiya',
			artist: 'Thai Trinh - Cover',
			path: './assets/audio/15.mp3',
			imgUrl: './assets/audio/15.jpg',
		},
						{
			title: 'Lover',
			artist: '7!!',
			path: './assets/audio/16.mp3',
			imgUrl: './assets/audio/16.jpg',
		},
						{
			title: '蝶々結び',
			artist: 'Aimer',
			path: './assets/audio/17.mp3',
			imgUrl: './assets/audio/17.jpg',
		}
	],

    /* ------------- set isRandom and isRepeat value to localStorage ------------ */
	setConfig: function (key, value) {
		this.config[key] = value;
		localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
	},

    /* ------------------------ render tracks to playlist ----------------------- */
	render: function () {
		const htmls = this.tracks.map((track, index) => {
			return `
      <div class="track ${
			index === this.currentIndex ? 'active' : ''
		}" data-index="${index}">
      <p class="track-item">
      ${track.title} - ${track.artist}
      </p>
      </div>

      `;
		});
		playlist.innerHTML = htmls.join('');
	},

    /* --------------------------- can not understand --------------------------- */
	defineProperties: function () {
		Object.defineProperty(this, 'currentTrack', {
			get: function () {
				return this.tracks[this.currentIndex];
			},
		});
	},

    /* ------------------------------ handle events ----------------------------- */
	handleEvents: function () {
		const _this = this;

        // handleEvent: set track thumb animation
		const trackThumbAnimate = trackThumb.animate(
			[{ transform: 'rotate(360deg)' }],
			{
				duration: 10000,
				iterations: Infinity,
			}
		);
		trackThumbAnimate.pause();

        // handleEvent: play or pause track with currentTrack = tracks[currentIndex]
		playBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
			audio.onplay = function () {
				_this.isPlaying = true;
				playIcon.style.display = 'none';
				pauseIcon.style.display = 'flex';
				playStatus.classList.add('playing');
				trackThumbAnimate.play();
                progressBar.classList.add("progressBar")
			};
			audio.onpause = function () {
				_this.isPlaying = false;
				playIcon.style.display = 'flex';
				pauseIcon.style.display = 'none';
				playStatus.classList.remove('playing');
				trackThumbAnimate.pause();
                progressBar.classList.remove("progressBar")

			};
		};
        // handleEvent: next or prev track with currentTrack = tracks[currentIndex++ || currentIndex--]
		prevBtn.onclick = function () {
			if (_this.isRandom) {
				_this.playRandomTrack();
			} else {
				_this.prevTrack();
			}
            progressBar.classList.remove("progressBar")
			audio.play();
            progressBar.classList.add("progressBar")
			_this.render();
			// _this.scrollToAcitveSong();

		};
		nextBtn.onclick = function () {
			if (_this.isRandom) {
				_this.playRandomTrack();
			} else {
				_this.nextTrack();
			}
            progressBar.classList.remove("progressBar")
			audio.play();
            progressBar.classList.add("progressBar")
			_this.render();
			// _this.scrollToAcitveSong();
		};

        // handleEvent: audio.duration bar
		audio.ontimeupdate = function () {
			if (audio.duration) {
                // set input type='range' value
				const progressPercent = Math.floor(
					(audio.currentTime / audio.duration) * 100
				);
				progress.value = progressPercent;

                // set animation duration for progressBar element
                progressBar.style.animationDuration = `${audio.duration + 10}s`

			}
		};

        // handleEvent: change input=range value by mouse
		progress.onchange = function (e) {
			const seekTime = (audio.duration / 100) * e.target.value;
			audio.currentTime = seekTime;
		};

		// handleEvent: when track end
		audio.onended = function () {
			if (_this.isRepeat) {
				audio.play();
			} else {
				nextBtn.click();
			}
		};

		// 	handleEvent: when toggle track random/repeat value
		randomBtn.onclick = function (e) {
			_this.isRandom = !_this.isRandom;
			_this.setConfig('isRandom', _this.isRandom);
			randomBtn.classList.toggle('active', this.isRandom);
		};
		repeatBtn.onclick = function (e) {
			_this.isRepeat = !_this.isRepeat;
			_this.setConfig('isRepeat', _this.isRepeat);
			repeatBtn.classList.toggle('active', this.isRepeat);
		};


	    // 	handleEvent: play track when click on playlist
		playlist.onclick = function (e) {
			const trackNode = e.target.closest('.track:not(.active)');
			if (trackNode) {
				_this.currentIndex = Number(trackNode.dataset.index);
				_this.loadCurrentTrack();
				_this.render();
				playBtn.click();
				audio.play();
			}
		};

        // 	handleEvent: show playlist
		btnPlaylist.onclick = function () {
			dashboard.classList.remove('hide-playlist');
			btnPlaylist.style.display = 'none';
			btnPlaylistClose.style.display = 'flex';
			dashboard.classList.add('show-playlist');
		};

        // 	handleEvent: hide playlist
		btnPlaylistClose.onclick = function () {
			dashboard.classList.remove('show-playlist');
			btnPlaylistClose.style.display = 'none';
			btnPlaylist.style.display = 'flex';
			dashboard.classList.add('hide-playlist');
		};
	},

    // handleEvent: prev track with currentTrack = tracks[currentIndex--]
	prevTrack: function () {
		this.currentIndex--;
		if (this.currentIndex < 0) {
			this.currentIndex = this.tracks.length - 1;
		}
		this.loadCurrentTrack();
	},

    // handleEvent: next track with currentTrack = tracks[currentIndex++]
	nextTrack: function () {
		this.currentIndex++;
		if (this.currentIndex > this.tracks.length - 1) {
			this.currentIndex = 0;
		}
		this.loadCurrentTrack();
	},

    // handleEvent: next or prev track with currentTrack = tracks[currentIndex = random value]
	playRandomTrack: function () {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.tracks.length);
		} while (this.currentIndex === this.currentTrack);
		this.currentIndex = newIndex;
		this.loadCurrentTrack();
	},

	// scrollToAcitveSong: function () {
	// 	setTimeout(function () {
	// 		$('.track.active').scrollIntoView({
	// 			behavior: 'smooth',
	// 			block: 'nearest',
	// 		});
	// 	});
	// },

	loadConfig: function () {
		this.isRandom = this.config.isRandom;
		this.isRepeat = this.config.isRepeat;
		// this.isFav = this.config.isFav;
	},

	loadCurrentTrack: function () {
		trackName.textContent = this.currentTrack.title;
		trackSinger.textContent = this.currentTrack.artist;
		trackURL.src = this.currentTrack.path;
		// sectionOne.style.backgroundImage = `url('${this.currentTrack.imgUrl}')`;
		trackThumb.style.backgroundImage = `url('${this.currentTrack.imgUrl}')`;
	},

	start: function () {
		this.loadConfig();
		// this.getSong();
		this.handleEvents();
		this.defineProperties();
		this.loadCurrentTrack();
		this.render();

		randomBtn.classList.toggle('active', this.isRandom);
		repeatBtn.classList.toggle('active', this.isRepeat);
	},
};
app.start();
