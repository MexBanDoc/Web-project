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
    ];

    this.audios = {};
  }

  setUpSounds() {
    this.loadFiles()
    this.audios['button'].playbackRate = 4;
    this.audios['range'].playbackRate = 3;
  }

  loadFiles() {
    for (let fname of this.audiofilenames) {
      // let audio = document.createElement("audio");
      let path = this.audioSrcPath + fname;
      let audio = new Audio(path);
      
      // audio.src = path;
      this.audios[fname.split(".")[0]] = audio;
    }
  }
}
