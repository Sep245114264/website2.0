import Mock from 'mockjs';

Mock.mock('user/login', (req) => {
  console.log(req);
});
