/* Coltrane Willsey   *
 * 2022-11-10 [08:34] */

interface Track {
  File: string,
  Title: string,
  Artist: string
}
class Track {
  constructor(artist: string, title: string, file: string) {
    this.File = file
    this.Title = title
    this.Artist = artist
  }
}

interface MediaPlayer {
  AudioElement: HTMLAudioElement;
  CurrentTrack?: Track;
  TrackIndex: number;
  Playlist?: [Track];
  Playing: boolean;
  Volume: number;
}
class MediaPlayer {
  constructor() {
    this.AudioElement = new Audio()
    this.CurrentTrack = null;
    this.TrackIndex = 0;
    this.Playlist = null;
    this.Playing = false;
    this.Volume = 1.0;
  }

  GetLength() {
    return this.AudioElement.duration
  }
  GetTimePosition() {
    return this.AudioElement.currentTime
  }

  SetTrack(track: Track) {
    this.CurrentTrack = track
    this.AudioElement.src = this.CurrentTrack.File
  }
  GoToFirstTrack() {
    this.TrackIndex = 0
    this.SetTrack(this.Playlist[this.TrackIndex])
  }
  SkipTrack(direction?: 'previous' | 'next') {
    console.assert(this.Playlist != null, "Cannot skip track, no playlist available")
    this.TrackIndex = ((this.TrackIndex + 1) % this.Playlist.length) - 1
    this.SetTrack(this.Playlist[this.TrackIndex])
  }
  SetPlaylist(playlist: [ Track ]) {
    this.Playlist = playlist
    this.TrackIndex = 0
  }
  AddToPlaylist(track: Track, index?: number) {
    if (index != null) {
      this.Playlist.splice(index, 0, track)
    } else {
      this.Playlist.push(track)
    }
  }
  RemoveFromPlaylist(index: number) {
    this.Playlist.splice(index, 1)
  }

  Play() {
    this.Playing = true;
    this.AudioElement.play();
  }
  Pause() {
    this.Playing = false;
    this.AudioElement.pause();
  }
  Toggle() {
    this.Playing = !this.Playing;
    this[this.Playing == true ? "Play" : "Pause"]()
  }
}

const ProgressBar = document.getElementById("progress");
const PlayPause = document.getElementById("pause")
const Skip = document.getElementById("skip");

const Playlist: [ Track ] = [
  new Track("Laura Les", "Haunted", "https://0x0.st/oE7X.mp3")
]

const inblockPlayer = new MediaPlayer();
inblockPlayer.SetPlaylist(Playlist);
inblockPlayer.GoToFirstTrack();
PlayPause.firstElementChild.className = "fa-solid fa-play";

PlayPause.onclick = () => {
  inblockPlayer.Toggle();
  PlayPause.firstElementChild.className = inblockPlayer.Playing ? "fa-solid fa-pause" : "fa-solid fa-play";
}

Skip.click = inblockPlayer.SkipTrack