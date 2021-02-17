import { toFirstUpper, formatTime } from './tool';
interface Req {
  conditions?: {
    author?: string;
    title?: string;
    columns?: string;
  };
  page?: number;
  pageSize?: number;
};
function reqGetArticles(req: Req) {
  const { conditions, page, pageSize } = req;
  const { author, title, columns } = conditions || {};
  return {
    author,
    title,
    columns,
    page,
    pageSize,
  };
}

const requestMap = new Map([['reqGetArticles', reqGetArticles]]);

export function formatRequest(method: string, req: { condition?: object; page?: number; pageSize?: number }) {
  const formatFunction = requestMap.get(`req${toFirstUpper(method)}`);
  return formatFunction ? formatFunction(req) : req;
}

function resGetArticles(res: { data: { list: any[] }}): object {
  res.data.list.forEach((item) => {
    item.createAt = formatTime(item.createAt);
    item.updateAt = formatTime(item.updateAt);
  });
  return res;
}
function resLogin(res: object) {
  console.log(res);
  return res;
}

const responseMap = new Map(
  [
    ['resGetArticles', resGetArticles],
    ['resLogin', resLogin]
  ]);
export function formatResponse(method: string, res: { data: { list: any[] } }) {
  const formatFunction = responseMap.get(`res${toFirstUpper(method)}`);
  return formatFunction ? formatFunction(res) : res;
}
