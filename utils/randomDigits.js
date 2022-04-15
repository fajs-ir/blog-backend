exports.randomDigit = (length = 6) => {
  return shuffle("012345678901234567890123456789012345678901234567890123456789".split('')).join('').substring(0, length);
}
const shuffle = (o) => {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}