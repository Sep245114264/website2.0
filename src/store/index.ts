import { createStore } from 'vuex'

const modulesNames = require.context('./modules', true, /\.(j|t)s$/);
let modules: { [key: string]: any } = {};
modules = modulesNames.keys().reduce((module, name) => {
  const obj: any = module;
  const [all, moduleName] = /\.\/(.*)\.(j|t)s$/.exec(name) as RegExpExecArray;
  obj[moduleName] = modulesNames(name).default;
  return obj;
}, {});

export default createStore<any>({
  modules: {
    ...modules
  }
})
