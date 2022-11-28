App({
    globalData: {
        tracks: null
    },
    audioContext: null,
    onLaunch(options) {
        this.audioContext = wx.getBackgroundAudioManager()
    }
})