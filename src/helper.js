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

export default {
  getCNFromEN: getCNFromEN,
}
