// pages/playlist/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tracks: null,
    isPlayerShow: false,
    picUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.isPlaying = false;
    const id = options.id;
    var reqTask = wx.request({
      url: `https://music.cyrilstudio.top/playlist/detail?id=${id}`,
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: (result) => {
        const data = result.data;
        if (data.code === 200) {
          const playlist = data.playlist;
          this.tracks = playlist.tracks;
          app.globalData.tracks = playlist.tracks;
          this.setData({
            tracks: playlist.tracks,
          });
          console.log("成功展示歌单详情", playlist.tracks);
        }
      },
      fail: () => {},
      complete: () => {},
    });
    // 自动播放歌单歌曲
    const audioContext = app.audioContext;
    audioContext.onEnded(() => {
      const tracks = this.data.tracks;
      if(!tracks.length) return;
      console.log("seek");
      const maxLen = tracks.length;
      if(this.index < maxLen) this.index++;
      const songid = tracks[this.index].id;
      const picUrl = tracks[this.index].al.picUrl;
      var reqTask = wx.request({
        url: `https://music.cyrilstudio.top/song/url/v1?id=${songid}`,
        data: {},
        header: { "content-type": "application/json" },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: (result) => {
          console.log(result);
          const data = result.data;
          if (data.code === 200) {
            const audioUrl = data.data[0].url;
            console.log("音频文件", audioUrl, this, getApp());
            const audioContext = app.audioContext;
            audioContext.stop();
            audioContext.src = audioUrl;
            audioContext.title = tracks[this.index].name;
            audioContext.autoplay = true;
            this.isPlaying = true;
            this.setData({
              isPlayerShow: true,
              picUrl,
            });
          }
        },
        fail: () => {},
        complete: () => {},
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  gotoPlayMusic(e) {
    console.log("点击单曲", e);
    const musicid = e.currentTarget.dataset.musicid;
    const picUrl = e.currentTarget.dataset.src;
    const index = e.currentTarget.dataset.index;
    this.index = index;
    var reqTask = wx.request({
      url: `https://music.cyrilstudio.top/song/url/v1?id=${musicid}`,
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: (result) => {
        console.log(result);
        const data = result.data;
        if (data.code === 200) {
          const audioUrl = data.data[0].url;
          console.log("音频文件", audioUrl, this);
          const audioContext = app.audioContext;
          audioContext.stop();
          audioContext.src = audioUrl;
          audioContext.title = this.tracks[index].name;
          audioContext.autoplay = true;
          this.setData({
            isPlayerShow: true,
            picUrl,
            musicname: this.tracks[index].name
          });
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },
});
