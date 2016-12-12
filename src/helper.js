import NotifyBox from './components/NotifyBox.js';
import ReactDOM from 'react-dom';
import React from 'react';
let notifyBoxTimeOut;

// help function
function getCNFromEN(name) {
  const dictionary = {
    gender: '性别',
    email: '电子邮箱',
    phone: '手机号码',
    username: '用户名',
    userDesc: '个人简介',
    password: '密码',
  };
  return dictionary[name];
}

function dateFormat(date) {
  if (date instanceof Date) {
    const dateObj = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
    for (let prop in dateObj) {
      if (dateObj[prop] < 10) {
        dateObj[prop] = '0' + dateObj[prop];
      }
    }
    return dateObj.year + '-' + dateObj.month + '-' + dateObj.date + ' ' +
           dateObj.hour + ':' + dateObj.minute + ':' + dateObj.second;
  }
  return '';
}

function notifyBox(message, type) {
  // Test NotifyBox
  if (notifyBoxTimeOut) {
    clearTimeout(notifyBoxTimeOut);
  }
  ReactDOM.render(<div></div>, document.getElementById('notifyBox'));
  ReactDOM.render(<NotifyBox notifyMessage={message} type={type}/>, document.getElementById('notifyBox'));
  notifyBoxTimeOut = setTimeout(() => {
    ReactDOM.render(<div></div>, document.getElementById('notifyBox'));
  }, 2000);
}

export default {
  getCNFromEN: getCNFromEN,
  dateFormat: dateFormat,
  notifyBox: notifyBox,
}
