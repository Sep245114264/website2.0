/**
 * load tinymce
 */
function load(script, callback) {
  Object.assign(script, {
    onload() {
      callback(null);
    },
    onerror() {
      callback(new Error(`加载${script.src}失败`));
    },
  });
}
function loadTinymce(src, callback) {
  const element = document.getElementById(src);
  if (!element) {
    const script = document.createElement('script');
    script.src = src;
    script.id = src;
    document.body.appendChild(script);
    load(script, callback);
  } else {
    callback(null);
  }
}

export default loadTinymce;
