let state = 0;
let mute = 0;
const audio = document.querySelector('audio');
let seeker = document.getElementById('seeker');
let raf = null;
const music_name = 'Lofi Chill';

$(".audio-name").text(music_name);

$(".control-btn").click(function (e) { 
    e.preventDefault();
    if (state == 0) {
        $(".control-btn").html('<i class="fa-solid fa-pause"></i>');
        requestAnimationFrame(whilePlaying);
        audio.play();
        state = 1;
    } else {
        $(".control-btn").html('<i class="fa-solid fa-play"></i>');
        cancelAnimationFrame(raf);
        audio.pause();
        state = 0;
    }
});

$(".mute-btn").click(function (e) { 
    e.preventDefault();
    if (mute == 0) {
        $(".mute-btn").html('<i class="fa-solid fa-volume-xmark"></i>');
        audio.muted = true;
        mute = 1;
    } else {
        $(".mute-btn").html('<i class="fa-solid fa-volume-low"></i>');
        if (audio.volume >= 0.5) {
            $(".mute-btn").html('<i class="fa-solid fa-volume-high"></i>');
        } else if (audio.volume == 0) {
            $(".mute-btn").html('<i class="fa-solid fa-volume-xmark"></i>');
        }
        audio.muted = false;
        mute = 0;
    }
});

const parseTime = (dur) => {
    const min = Math.floor(dur / 60);
    const sec = Math.floor(dur % 60);
    const rtSec = sec < 10? `0${sec}`:sec;
    return `${min}:${rtSec}`;
}

const displayDuration = (dur) => {
    $(".max").text(dur);
}

const setSliderMax = () => {
    seeker.max = Math.floor(audio.duration);
}

if (audio.readyState > 0) {
    displayDuration(parseTime(audio.duration));
    setSliderMax();
} else {
    audio.addEventListener("loadedmetadata", () => {
        displayDuration(parseTime(audio.duration));
        setSliderMax();
        $(".music").css("--vol-before-width", `${volSlider.value / volSlider.max *100}%`);
    })
}

seeker.addEventListener('input', () => {
    $(".current").text(parseTime(seeker.value));
    $(".music").css("--seek-before-width", `${seeker.value / seeker.max *100}%`);
    if (!audio.paused) {
        cancelAnimationFrame(raf);
    }
});

seeker.addEventListener('change', () => {
    audio.currentTime = seeker.value;
    if (!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
})

const whilePlaying = () => {
    seeker.value = Math.floor(audio.currentTime);
    $(".current").text(parseTime(seeker.value));
    $(".music").css("--seek-before-width", `${seeker.value / seeker.max *100}%`);
    raf = requestAnimationFrame(whilePlaying);
}
let volSlider = document.getElementById('vol');
volSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value/100;
    $(".music").css("--vol-before-width", `${volSlider.value / volSlider.max *100}%`);
    $(".vol-label").text(`${e.target.value}%`);
    if (e.target.value == 0) {
        $(".mute-btn").html('<i class="fa-solid fa-volume-xmark"></i>');
    } else if (e.target.value > 0 && mute == 0) {
        $(".mute-btn").html('<i class="fa-solid fa-volume-low"></i>');
        if (volSlider.value >= 50) {
            $(".mute-btn").html('<i class="fa-solid fa-volume-high"></i>');
        }
    }
})