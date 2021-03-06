/* eslint-disable */
/**
 * @date: 2020-04-12
 * @desc: 对 element-ui 中的弹出层进行的 二次封装，统一项目弹出层风格、简化调用方式
 * @lastEditor:
 */

import { Message, MessageBox, Notification } from 'element-ui'

const layer = {
  // 消息提示层
  msg(message, { duration = 3000, type = '', offset, onClose, customClass } = {}) {
    return Message({
      message,
      showClose: true,
      offset,
      duration,
      customClass,
      type,
      dangerouslyUseHTMLString: true,
      onClose
    })
  },

  // 通知
  notify(
    message,
    { title = '提示', duration = 4500, type = '', onClose, onClick, position, offset, showClose } = {}
  ) {
    return Notification({
      title,
      duration,
      message,
      type,
      offset,
      dangerouslyUseHTMLString: true,
      onClose,
      onClick,
      position,
      showClose
    })
  },

  // 确认框
  confirm(
    msg,
    { title = '温馨提示', type = 'warning' , confirmButtonText = '确定' , cancelButtonText = '取消' } = {}
  ) {
    return new Promise((resolve, reject) => {
      MessageBox.confirm(msg, {
        confirmButtonText,
        cancelButtonText,
        title,
        type,
        dangerouslyUseHTMLString: true
      })
        .then(() => resolve())
        .catch(() => reject())
    })
  },

  // 警告框
  alert(msg, { title = '提示' } = {}) {
    MessageBox.alert(msg, {
      title,
      closeOnClickModal: true,
      dangerouslyUseHTMLString: true
    })
      .then(() => {})
      .catch(() => {})
  },

  // 确认输入框
  prompt(title = '输入信息', { inputType = 'textarea', words = 500 } = {}) {
    return new Promise((resolve, reject) => {
      MessageBox.prompt('', {
        title,
        inputType,
        inputPlaceholder: '字数不得超过' + words,
        inputValidator(val) {
          const ispass = new RegExp('^.{0,' + words + '}$').test(val)
          const msg = ispass ? true : '字数不得超过' + words
          return msg
        }
      })
        .then(res => {
          const val = res.value == null ? '' : res.value
          resolve(val.trim())
        })
        .catch(cancel => {
          reject(cancel)
        })
    })
  }
}

export default layer
