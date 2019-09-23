import ioBase from 'socket.io-client'

export default store => {
  let socket = ioBase.connect(process.env.VUE_APP_SERVER)
  socket.on('connect', () => {
    console.log(socket.connected)
  })

  socket.on('playlistchanged', playlist => {
    console.log(playlist)
    store.commit('setPlaylist', playlist)
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
        if (state.room.code) {
          console.log('room code', state.room.code)
          socket.emit('joinroom', state.room.code)
        }
        break
      default:
        break
    }
  })
}
