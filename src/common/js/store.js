export function saveToLocal (id, key, value) {
  let seller = localStorage.__seller__
  if (!seller) { // 是否有seller对象
    seller = {}
    seller[id] = {}
    seller[id][key] = value
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal (id, key, def) {
  let seller = localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id] // 取值商家id下的值
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
