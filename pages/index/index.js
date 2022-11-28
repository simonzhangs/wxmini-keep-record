// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotPlaylists: null,
    value: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
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
  init() {
    this.getHotPlaylists();
  },
  getHotPlaylists() {
    const timestamp = Date.now();
    var reqTask = wx.request({
      url: `https://music.cyrilstudio.top/personalized?timestamp${timestamp}`,
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: (result) => {
        console.log('hot',result);
        if (result.statusCode === 200) {
          const hotPlaylists = result.data.result;
          hotPlaylists.map((item,index) => {
            if (item.picUrl) {
              item.picUrl = item.picUrl;
            }
          });
          this.setData({
            hotPlaylists: hotPlaylists.slice(0,6),
          });
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },
  gotoPlaylistPage(e) {
    const id = e && e.target && e.target.dataset && e.target.dataset.listid;
    const pagePath = `/pages/playlist/index?id=${id}`;
    id &&
      wx.navigateTo({
        url: pagePath,
        success: (result) => {
          console.log("跳转至歌单详情页");
        },
        fail: () => {},
        complete: () => {},
      });
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  gotoSearchPage(e) {
    // const keywords = e && e.detail && e.detail;
    const keywords = this.data.value;
    wx.navigateTo({
      url: `/pages/search/index?keywords=${keywords}`,
      success: () => {
        console.log("跳转至搜索页", keywords, e, this);
      },
      complete: () => { },
    });
  },
});
