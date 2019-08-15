import Mock from 'mockjs';

const userInfo = {
  'admin-token': {
    name: 'qez',
    roles: ['admin'],
  },
  'editor-token': {
    name: 'vv',
    roles: ['editor'],
  },
};
const urlMap = {
  login: /.*\/user\/login/,
  getInfo: /.*\/user\/info.*/,
};
const tokens = {
  admin: { token: 'admin-token' },
  editor: { token: 'editor-token' },
};
Mock.mock(urlMap.login, (req) => {
  const login = JSON.parse(req.body);
  const token = tokens[login.username];
  if (!token) {
    return {
      code: 4000,
      message: '用户名或密码错误',
    };
  }
  return {
    code: 200,
    data: token,
  };
});

Mock.mock(urlMap.getInfo, (req) => {
  const token = req.url.split('?')[1].split('=')[1];
  return {
    code: 200,
    data: userInfo[token],
  };
});
