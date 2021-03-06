/* global wx */

export {
  alert,
  request,
  setStorage,
  getSystemInfo,
  getSystemInfoSync,
};

/**
 * 显示消息提示框 wx.showToast
 * https://developers.weixin.qq.com/miniprogram/dev/api/wx.showToast.html
 * @param {string} title
 * @param {Object} [options]
 * @param {string} [options.icon=success] 枚举: success, loading, none
 * @param {string} [options.image] 自定义图标, 优先级高于 icon
 * @param {number} [options.duration=1500] 提示的延迟时间 毫秒
 * @param {boolean} [options.mask=false] 是否显示透明蒙层，防止触摸穿透
 * @return {Promise<void>}
 */
function alert(title, options = {}) {
  return new Promise((resolve, reject) => {
    wx.showToast(Object.assign({
      title,
      success: resolve,
      fail: reject,
    }, options));
  });
}

/**
 * 网络请求 wx.request
 * @param {String} url
 * @param {Object} [options]
 * @param {string | object} [options.data] 请求的参数
 * @param {Object} [options.header]
 * @param {String} [options.method]
 * @return {Promise<{data,statusCode:number,header}>}
 */
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    wx.request(Object.assign({}, options, {
      url,
      success(res) {
        resolve(res);
      },
      fail() {
        reject(new Error('微信接口调用失败'));
      },
    }));
  });
}

/**
 * 本地缓存 wx.setStorage
 * @param {String} key - 本地缓存中的指定的 key
 * @param {Object} data - 需要存储的内容
 * @param {Object} options - 可选配置项
 * @return {Promise}
 */
function setStorage(key, data, options = {}) {
  return new Promise((resolve, reject) => {
    wx.setStorage(Object.assign({}, options, {
      key,
      data,
      success() {
        resolve(true);
      },
      fail() {
        reject(new Error('微信接口调用失败'));
      },
    }));
  });
}

/**
 * 获取系统信息 wx.getSystemInfo
 * 建议使用 wx.getSystemInfoSync() 替代
 * @return {Promise<SystemInfo>}
 * @link https://developers.weixin.qq.com/miniprogram/dev/api/wx.getSystemInfo.html
 */
function getSystemInfo() {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success(res) {
        resolve(res);
      },
      fail: reject,
    });
  });
}

/**
 * 同步获取系统信息 wx.getSystemInfoSync
 * @return {SystemInfo}
 */
function getSystemInfoSync() {
  return wx.getSystemInfoSync();
}

/**
 * @typedef SystemInfo
 * @property {string} brand 设备品牌 1.5.0
 * @property {string} model 设备型号
 * @property {number} pixelRatio 设备像素比
 * @property {number} screenWidth 屏幕宽度，单位px 1.1.0
 * @property {number} screenHeight 屏幕高度，单位px 1.1.0
 * @property {number} windowWidth 可使用窗口宽度，单位px
 * @property {number} windowHeight 可使用窗口高度，单位px
 * @property {number} statusBarHeight 状态栏的高度，单位px 1.9.0
 * @property {string} language 微信设置的语言
 * @property {string} version 微信版本号
 * @property {string} system 操作系统及版本
 * @property {string} platform 客户端平台
 * @property {number} fontSizeSetting 用户字体大小（单位px）。  1.5.0
 * @property {string} SDKVersion 客户端基础库版本 1.1.0
 * @property {number} [benchmarkLevel] 设备性能等级（仅Android小游戏）。 1.8.0
 * @todo 根据文档继续完善属性
 */
