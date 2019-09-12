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
// const urlMap = {
//   login: new RegExp('/user/login'),
//   getInfo: /.*\/user\/info.*/,
// };
const tokens = {
  admin: { token: 'admin-token' },
  editor: { token: 'editor-token' },
};

// export function mockXHR() {
//   Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
//   Mock.XHR.prototype.send = function () {
//     if (this.custom.xhr) {
//       this.custom.xhr.withCredentials = this.withCredentials || false;
//       if (this.responseType) {
//         this.custom.xhr.responseType = this.responseType;
//       }
//     }
//     this.proxy_send(...arguments);
//   };

//   // Mock.mock(urlMap.login, (req) => {
//   //   const login = JSON.parse(req.body);
//   //   const token = tokens[login.username];
//   //   if (!token) {
//   //     return {
//   //       code: 4000,
//   //       message: '用户名或密码错误',
//   //     };
//   //   }
//   //   return {
//   //     code: 200,
//   //     data: token,
//   //   };
//   // });

//   // Mock.mock(urlMap.getInfo, (req) => {
//   //   const token = req.url.split('?')[1].split('=')[1];
//   //   return {
//   //     code: 200,
//   //     data: userInfo[token],
//   //   };
//   // });
// }

const mocks = [
  {
    url: '/user/login',
    methods: 'post',
    response(request) {
      console.log(request.body);
      const { username } = request.body;
      const token = tokens[username];
      if (!token) {
        return {
          code: 4000,
          message: '密码错误',
        };
      }
      return {
        code: 200,
        ...token,
      };
    },
  },
  {
    url: '/user/info.*',
    methods: 'get',
    response(request) {
      const { token } = request.query;
      const info = userInfo[token];
      return {
        code: 200,
        data: info,
        update: 'successss',
      };
    },
  },
  {
    url: '/article/getArticles.*',
    methods: 'get',
    response(request) {
      console.log(request.query);
      const response = Mock.mock({
        code: 200,
        data: {
          'list|10': [
            {
              title: '@ctitle',
              author: '@cname',
              createTime: '@datetime',
              updateTime: '@datetime',
            },
          ],
        },
      });
      return response;
    },
  },
  {
    url: '/upload/image',
    methods: 'post',
    response(request) {
      console.log(request.body);
      return {
        code: 200,
        location: '/test',
      };
    },
  },
  {
    url: '/upload/article',
    methods: 'post',
    response(request) {
      return {
        code: 200,
        message: 'success',
      };
    },
  },
];

export default mocks.map((mock) => {
  const { url, methods, response } = mock;
  return {
    url: new RegExp(url),
    methods,
    response,
  };
});
