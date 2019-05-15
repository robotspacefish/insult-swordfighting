const randomIndex = (len) => {
  return Math.floor(Math.random() * len);
}

const delay = (func, timeout = 1000) => {
  this.delayId = setTimeout(func, timeout);
}

export { randomIndex, delay };