import ioBase from 'socket.io-client'

export default store => {
  let socket = ioBase.connect(process.env.VUE_APP_SERVER, {
    path: '/api/socket.io',
  })
  socket.on('connect', () => {
    console.log('Socket connected')
  })

  socket.on('playlistchanged', playlist => {
    console.log(playlist)
    store.commit('setPlaylist', playlist)
  })

  socket.on('voteskip', voteSkip => {
    store.commit('setVotesToSkip', voteSkip)
  })

  socket.on('newuser', newuser => {
    store.commit('setUsersCount', newuser)
  })
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
