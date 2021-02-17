const isOnePointZero = function(n: unknown) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}

const isPercentage = function(n: unknown) {
  return typeof n === 'string' && n.indexOf('%') !== -1
}

const bound01 = function(value: number | string, max: number | string) {
  if (isOnePointZero(value)) value = '100%'

  const processPercent = isPercentage(value)
  value = Math.min((max as number), Math.max(0, parseFloat(value + '')))

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt((value * (max as number)) + '', 10) / 100
  }

  // Handle floating point rounding errors
  if ((Math.abs(value - (max as number)) < 0.000001)) {
    return 1
  }

  // Convert into [0, 1] range if it isn't already
  return (value % (max as number)) / parseFloat(max as string)
}

const hsv2rgb = function(h: number|string, s: number|string, v: number|string) {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

interface Options {
  enableAlpha: boolean;
  format: string;
  value?: string;
};
interface Params {
  [key: string]: any;
}
export default class Color implements Params {
  private _hue = 0;
  private _saturation = 100;
  private _value = 100;
  private _alpha = 100;
  public enableAlpha = false;
  public format = 'hex';
  public value?: string = '';
  public selected?: boolean;
  [key: string]: any;
  constructor(options: Options) {
    this.format = options.format;
    this.enableAlpha = options.enableAlpha;
    this.value = options.value;
  }

  toRgb() {
    return hsv2rgb(this._hue, this._saturation, this._value);
  }

  get(prop: string) {
    return this[`_${prop}`];
    // return this['_alpha'];
  }

  set(prop: string, value: string | number | boolean) {
    this['_' + prop] = value;
  }
}
