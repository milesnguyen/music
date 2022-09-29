const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const  PLAYER_STORAGE_KEY = 'Music_App'

const playlistBtn = $(".playlist-btn");
const playlist = $(".music-playlist");

// console.log([playlistBtn]);
    


    const player = $(".apps");
    const playList = $('.music-playlist-songs')
    const heading = $('.music-title')
    const thumb = $('.music-cd__thumb')
    const sinGer = $('.music-singer')
    const audio = $('#audio')
    const playBtn = $('.btn-toggle-play')
    const progress = $('.progress_value')
    const nextBtn = $('.btn-next')
    const prevBtn = $('.btn-prev')
    const randomBtn = $('.btn-random')
    const timeCurrent = $('.progress-time__current');
    const timeDuration = $('.progress-time__current');
    const repeatBtn = $('.btn-repeat');
    const offBtn = $('.music-btn__off');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs : [
        
        {
            name: 'Ngã tư không đèn',
            singer: 'My Anh, Khắc Hưng',
            path: './mp3/Nga Tu Khong Den - Trang_ Khoa Vu.mp3',
            image: './img/ngatukoden.jpg'
        },
        {
            name: 'Ánh sao và bầu trời',
            singer: 'T.R.I',
            path: './mp3/Anh Sao Va Bau Troi - T_R_I.mp3',
            image: './img/anhsaovabautroi.jpg'
        },
        {
            name: 'Cứ chill thôi',
            singer: 'Chillieas',
            path: './mp3/Cu Chill Thoi - Chillies_ Suni Ha Linh_.mp3',
            image: './img/cuchillthoi.jpg'
        },
        {
            name: 'Độ tộc 2',
            singer: 'Masew Phúc Du Mixigaming',
            path: './mp3/Do Toc 2 - Masew_ Phuc Du_ Mixigaming_ P.mp3',
            image: './img/dotoc.jpg'
        },
        {
            name: 'Real love',
            singer: 'My Anh, Khắc Hưng',
            path: './mp3/Real Love - My Anh_ Khac Hung.mp3',
            image: './img/reallove.jpg'
        },
        {
            name: 'Sài Gòn hôm nay mưa',
            singer: 'JSOL',
            path: './mp3/Sai Gon Hom Nay Mua - JSOL_ Hoang Duyen.mp3',
            image: './img/saigonhomnaymua.jpg'
        },
        {
            name: 'Mặt mộc',
            singer: 'Phạm Nguyen Ngọc, VAnh',
            path: './mp3/Mat-Moc-Phạm-Nguyen-Ngọc-x-VAnh-x-An-Nhi.mp3',
            image: './img/matmoc.jpg'
        },
        {
            name: 'Ngày đầu tiên',
            singer: 'Đức Phúc',
            path: './mp3/NgayDauTien-DucPhuc-7129810.mp3',
            image: './img/ngaydautien.jpg'
        },
        {
            name: 'Đứa nào làm em buồn',
            singer: 'Phúc Du, Hoàng Dũng',
            path: './mp3/dua nao lam em buon_ - Phuc Du, Hoang Dung - NhacHay360.mp3',
            image: './img/duanaolamembuon.jpg'
        },
        {
            name: 'Vì mẹ anh bắt chia tay',
            singer: 'Miu Lê, Karik, Châu Đăng Khoa',
            path: './mp3/Vi Me Anh Bat Chia Tay - Miu Le, Karik, Chau Dang Khoa - NhacHay360.mp3',
            image: './img/vimeanhbatchiatay.jpg'
        },
    ],

    defineProperties: function() {
        Object.defineProperty(this,'currentSong', { // object trả về bài hát theo chỉ mục currentIndex
            get: function() {
                return this.songs[this.currentIndex]
            }
        })

    },
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function() {
        const htmls = this.songs.map((song,index)=>{
            
            return `
            
            <div class="music-playlist__song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="song-thumb" style="background-image: url('${song.image}');"></div>
            <div class="song-body">
            <div class="song-name">${song.name}</div>
            <div class="song-singer">${song.singer}</div>
            </div>
            <div class="song-option"><i class="fas fa-ellipsis-h"></i></div>
            </div>

            `
        })
        playList.innerHTML = htmls.join('\n')   
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        sinGer.textContent = this.currentSong.singer
        thumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) 
        {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) 
        {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    handleEvents: function(){
        const _this = this

        const cdThumbAnimation = thumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration : 10000, // 10 seconds
            iterations: Infinity
        })
        cdThumbAnimation.pause()

        
        playBtn.onclick = function () {
            if (_this.isPlaying) {
              audio.pause();
            } else {
              audio.play();
            }
          };
      
          playlistBtn.addEventListener('click',()=>{

            playlistBtn.classList.toggle('actives');
            playlist.classList.toggle('actives');
            playlist.classList.remove('non-active')
            offBtn.classList.toggle('active');
            });
            
            offBtn.onclick = function(){
                playlistBtn.classList.remove('actives');
                playlist.classList.remove('actives');
                playlist.classList.remove('non-active')
                offBtn.classList.remove('active');
            }
          // Khi song được play
          audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimation.play()
          };

          audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimation.pause()
          };

          audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
          }

          progress.onchange = function(e){
            const seekTIme = audio.duration / 100 * e.target.value
            audio.currentTime = seekTIme
          }
          nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong(); // Xử lí random song
            }else{
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
          }
          prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong(); // Xử lí random song
            }else{
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
          }
        randomBtn.onclick = function(e){
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('activeBtn', _this.isRandom);
        }

          progress.oninput = function(e){
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        };
        repeatBtn.onclick = function(e){ 
            _this.isRepeat =!_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('activeBtn', _this.isRepeat);
            
        }
        audio.onended = function() {
            if ( _this.isRepeat) {
                audio.play();
            } else {    
                nextBtn.click()
            }
        }
        
        // playList.onclick = function(e) {
        //     if (e.target.closest('.music-playlist__song:not(.active)')|| !e.target.closest('.song-option')) {
        //         console.log(e.target)
        //     }
        // };
        playList.onclick = function(e){
            const songNode = e.target.closest('.music-playlist__song:not(.active)');
            if(songNode ||e.target.closest('.song-option')){
                // Xử lí khi click vào bài hát 
                if (songNode){
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                // Xử lí khi ấn vào option
                if(e.target.closest('.song-option') ){
                    
                }
            }
        }
        },
        
        playRandomSong: function() {
            let newIndex 
        do {
            newIndex = Number.parseInt(Math.random() * this.songs.length);
        } while(this.currentIndex === newIndex)
        console.log(newIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        },
    start: function(){
        // this.loadConfig();

        this.defineProperties();

        this.handleEvents()

        this.loadCurrentSong()

        this.render();

        repeatBtn.classList.toggle('activeBtn', this.isRepeat);
        randomBtn.classList.toggle('activeBtn', this.isRandom);
    }
}

app.start()