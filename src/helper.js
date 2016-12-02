// help function
function getCNFromEN(name) {
  switch (name) {
    case 'gender':
      return '性别';
      break;
    case 'email':
      return '电子邮箱';
      break;
    case 'phone':
      return '手机号码';
      break;
    case 'username':
      return '用户名';
      break;
    case 'userDesc':
      return '个人简介';
      break;
    default:
      return '';
  }
}

export default {
  getCNFromEN: getCNFromEN,
}
