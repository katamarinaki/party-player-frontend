import ioBase from 'socket.io-client'

export default store => {
  const socket = ioBase.connect(process.env.VUE_APP_SERVER)
  socket.on('connect', function(data) {
    console.log('connect', data)
  })
  socket.on('connection', function(data) {
    console.log('connection', data)
  })

  // if (store.state.room.code) {
  //   socket.join(store.state.room.code)
  //   console.log('joined room')
  // }
  // socket.on('message', function(data) {
  //   console.log(data)
  // })

  store.subscribe((mutation, state) => {
    // вызывается после каждой мутации
    // мутация передаётся в формате `{ type, payload }`.
    if (!socket) {
      console.log('socket not def')
      return
    }
    switch (mutation.type) {
      case 'setRoom':
        if (state.room.code) socket.join(state.room.code)
        break
      default:
        break
    }
  })
}
