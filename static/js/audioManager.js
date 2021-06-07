export class AudioManager {
  constructor() {
    this.audioSrcPath = "../static/assets/sounds/";
    this.audiofilenames = [
      "ballLoss.wav",
      "bonusFall.wav",
      "brickDestroyed.wav",
      "button.wav",
      "backButton.wav",
      "diamСaught.wav",
      "fail.wav",
      "win.wav",
      "range.wav",
      "background.mp3",
      "winBtn.mp3",
      "boardTouch.wav",
    ];

    this.audios = {};
    this.muted = false;
  }

  tryPlay(sound) {
    if (!this.muted) {
      this.audios[sound].currentTime = 0;
      this.audios[sound].play();
    }
  }

  stopSound(sound) {
    this.audios[sound].pause();
    this.audios[sound].currentTime = 0;
  }

  stopEverySound() {
    for (let audio of this.audios) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  setVolume(volume) {
    for (const [name, audio] of Object.entries(this.audios)) {
      audio.volume = volume;
      audio.currentTime = 0;
    }
  }

  mute() {
    this.muted = true;
  }

  setUpSounds() {
    this.loadFiles();
    this.audios["button"].playbackRate = 4;
    this.audios["range"].playbackRate = 3;
    this.audios["boardTouch"].playbackRate = 3;
    this.audios["background"].loop = true;
  }

  loadFiles() {
    for (let fname of this.audiofilenames) {
      let path = this.audioSrcPath + fname;
      let audio = new Audio(path);

      this.audios[fname.split(".")[0]] = audio;
    }
  }
}
