const addProps = (target) => {
  target.prototype.$nextTick = () => {
    setTimeout(() => {
      console.log(0)
    }, 1000)
  }
}

@addProps
class MyTest {
  state = {
    list: ['a', 'b']
  }

  constructor() {
    this.message = 'gp145'
  }

  show() {
    console.log(this.message)
    console.log(this.state.list)
    // let obj = Object.assign({y: 1}, {x: 0})
    // console.log(obj)
    let arr = Array.from(new Array(10)).map(element => {
      return new Date().getTime()
    })
    console.log(arr)
  }
}

const myArrowFunction = (props) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  })
}

const myTest = new MyTest

export {
  myTest,
  myArrowFunction as default
}