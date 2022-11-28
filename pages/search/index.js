// pages/search/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songs: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const keywords = options.keywords;
    var reqTask = wx.request({
      url: `https://music.cyrilstudio.top/search?keywords=${keywords}`,
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: (result) => {
        const data = result.data;
        console.log(data);
        if (data.code === 200) {
          const songs = data.result && data.result.songs;
          if (songs) {
            this.setData({
              songs,
            });
          }
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
    const musicid = e.target.dataset.id;
    const picUrl = e.target.dataset.src;
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
          console.log("音频文件", audioUrl, this, getApp());
          const audioContext = app.audioContext;
          audioContext.stop();
          audioContext.src = audioUrl;
          audioContext.title = "test";
          audioContext.autoplay = true;
          this.setData({
            isPlayerShow: true,
            picUrl,
          });
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },
});
