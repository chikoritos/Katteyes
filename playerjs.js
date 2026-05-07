    
<style>
    /* Sabit Konumlandırma */
    .fixed-player-wrapper {
        position: fixed;
        bottom: 20px;
        left: 18%;
        transform: translateX(-50%);
        z-index: 999999;
    }

    /* Oval Tasarım */
    .mini-oval-player {
        background: #000;
        width: 170px;
        height: 45px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border: 2px solid #ff0000;
        box-shadow: 0 0 30px rgba(0, 0, 0, 1), 0 0 15px rgba(139, 0, 0, 0.2);
             color: #8b0000; 
        padding: 0 10px;
        font-family: sans-serif;
    }

    .player-btn {
        background: none;
        border: none;
        color: #ff0000;
        cursor: pointer;
        font-size: 18px;
        text-shadow: 0 0 10px #ff0000;
        outline: none;
        transition: 0.3s;
    }

    .player-btn:hover { transform: scale(1.2); }

    /* İlerleme Çubuğu */
    #progress-container {
        width: 40px;
        height: 3px;
        background: #222;
        border-radius: 5px;
        overflow: hidden;
    }

    #mini-fill {
        width: 0%;
        height: 100%;
        background: #f00;
        box-shadow: 0 0 8px #f00;
    }

    /* Video Gizleme */
    #yt-player {
        position: absolute;
        top: -9999px;
        left: -9999px;
        pointer-events: none;
    }

    @media (max-width: 480px) {
        .fixed-player-wrapper {
            bottom: calc(15px + env(safe-area-inset-bottom));
            left: calc(220px + env(safe-area-inset-left));
        }
        .mini-oval-player {
            width: 140px;
            height: 38px;
        }
    }
</style>

<div class="fixed-player-wrapper">
    <div id="yt-player"></div>
    <div class="mini-oval-player">
        <button class="player-btn" onclick="togglePlay()" id="p-btn">▷</button>
        <div id="progress-container">
            <div id="mini-fill"></div>
        </div>
        <button class="player-btn" onclick="stopMusic()">■</button>
    </div>
</div>

<script src="https://www.youtube.com/iframe_api"></script>
<script>
    let player;
    const pBtn = document.getElementById('p-btn');
    const mFill = document.getElementById('mini-fill');

    // YouTube API Yüklemesi
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '1',
            width: '1',
            videoId: 'J-rwXY0jVGI', // BURAYA ŞARKININ ID'SINI YAZIN
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'disablekb': 1,
                'modestbranding': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        // Otomatik oynatmayı zorla (Tarayıcı izin verirse başlar)
        event.target.playVideo();
        
        // Kullanıcı sayfada herhangi bir yere tıkladığı an başlat (KESİN ÇÖZÜM)
        document.body.addEventListener('click', () => {
            if (player.getPlayerState() !== 1) {
                player.playVideo();
            }
        }, { once: true });
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            pBtn.innerHTML = '၊၊';
            updateProgress();
        } else {
            pBtn.innerHTML = '▷';
        }
    }

    function togglePlay() {
        if (player.getPlayerState() == YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }

    function stopMusic() {
        player.stopVideo();
        pBtn.innerHTML = '▷';
    }

    function updateProgress() {
        setInterval(() => {
            if (player && player.getCurrentTime) {
                const pct = (player.getCurrentTime() / player.getDuration()) * 100;
                mFill.style.width = pct + '%';
            }
        }, 1000);
    }
</script>
