/* global wx */

const wxp = {
  request,
  setStorage,
};

export default wxp;

/**
 * 网络请求
 * @param {String} url
 * @param {Object} options
 * @param {Object} options.header
 * @param {String} options.method
 * @return {Promise}
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
 * 本地缓存
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
