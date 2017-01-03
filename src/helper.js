import NotifyBox from './components/NotifyBox.js';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.js';

// Global variable
let notifyBoxTimeOut;
const fetchLinkHeader = 'http://localhost:3001/';
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

function isLogin(cb) {
  const params = {
    sessionId: localStorage.sessionId,
  };
  console.log('isLogin params: ', params);
  fetch(fetchLinkHeader + 'isLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(params),
  }).then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.success === 1 || json.success === '1') {
        cb(true);
        return true;
      } else {
        cb(false);
        return false;
      }
  }).catch((ex) => {
      console.log(ex);
      cb(false);
      return false;
  });
}

function getFileSize(sizeNum) {
  let cnt = 0;
  while (sizeNum > 1024) {
    sizeNum /= 1024;
    cnt++;
    if (cnt == 5) {
      break;
    }
  }
  const units = [' B', ' KB', ' MB', ' GB', ' TB', ' PB'];
  return sizeNum.toFixed(2) + units[cnt];
}

function getFileType(fileName) {
  const length = fileName.length;
  const extention = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
  const image = ['jpg', 'gif', 'jpeg', 'png'];

  if (image.indexOf(extention) !== -1) {
    return 'image';
  }

  return 'file';
}

export default {
  getCNFromEN: getCNFromEN,
  dateFormat: dateFormat,
  notifyBox: notifyBox,
  isLogin: isLogin,
  fetchLinkHeader: fetchLinkHeader,
  getFileSize: getFileSize,
  getFileType: getFileType,
}
