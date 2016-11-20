
let s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

export default function () {
  // then to call it, plus stitch in '4' in the third group
  // return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toLowerCase()
  return `${s4()}${s4()}-${s4()}-4${s4().substr(0, 3)}-${s4()}-${s4()}${s4()}${s4()}`.toLowerCase()
}
