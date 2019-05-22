const randomIndex = (len) => {
  return Math.floor(Math.random() * len);
}

const delay = (fn, timeout = 1000) => {
  setTimeout(() => fn(), timeout);
}

export { randomIndex, delay };