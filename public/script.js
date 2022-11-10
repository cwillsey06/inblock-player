var Track = (function () {
    function Track(artist, title, file) {
        this.File = file;
        this.Title = title;
        this.Artist = artist;
    }
    return Track;
}());
var MediaPlayer = (function () {
    function MediaPlayer() {
        this.AudioElement = new Audio();
        this.CurrentTrack = null;
        this.TrackIndex = 0;
        this.Playlist = null;
        this.Playing = false;
        this.Volume = 1.0;
    }
    MediaPlayer.prototype.GetLength = function () {
        return this.AudioElement.duration;
    };
    MediaPlayer.prototype.GetTimePosition = function () {
        return this.AudioElement.currentTime;
    };
    MediaPlayer.prototype.SetTrack = function (track) {
        this.CurrentTrack = track;
        this.AudioElement.src = this.CurrentTrack.File;
    };
    MediaPlayer.prototype.GoToFirstTrack = function () {
        this.TrackIndex = 0;
        this.SetTrack(this.Playlist[this.TrackIndex]);
    };
    MediaPlayer.prototype.SkipTrack = function (direction) {
        console.assert(this.Playlist != null, "Cannot skip track, no playlist available");
        this.TrackIndex = ((this.TrackIndex + 1) % this.Playlist.length) - 1;
        this.SetTrack(this.Playlist[this.TrackIndex]);
    };
    MediaPlayer.prototype.SetPlaylist = function (playlist) {
        this.Playlist = playlist;
        this.TrackIndex = 0;
    };
    MediaPlayer.prototype.AddToPlaylist = function (track, index) {
        if (index != null) {
            this.Playlist.splice(index, 0, track);
        }
        else {
            this.Playlist.push(track);
        }
    };
    MediaPlayer.prototype.RemoveFromPlaylist = function (index) {
        this.Playlist.splice(index, 1);
    };
    MediaPlayer.prototype.Play = function () {
        this.Playing = true;
        this.AudioElement.play();
    };
    MediaPlayer.prototype.Pause = function () {
        this.Playing = false;
        this.AudioElement.pause();
    };
    MediaPlayer.prototype.Toggle = function () {
        this.Playing = !this.Playing;
        this[this.Playing == true ? "Play" : "Pause"]();
    };
    return MediaPlayer;
}());
var ProgressBar = document.getElementById("progress");
var PlayPause = document.getElementById("pause");
var Skip = document.getElementById("skip");
var Playlist = [
    new Track("Laura Les", "Haunted", "https://0x0.st/oE7X.mp3")
];
var HippozPlayer = new MediaPlayer();
HippozPlayer.SetPlaylist(Playlist);
HippozPlayer.GoToFirstTrack();
PlayPause.firstElementChild.className = "fa-solid fa-play";
PlayPause.onclick = function () {
    HippozPlayer.Toggle();
    PlayPause.firstElementChild.className = HippozPlayer.Playing ? "fa-solid fa-pause" : "fa-solid fa-play";
};
Skip.click = HippozPlayer.SkipTrack;
