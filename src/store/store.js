import Vue from 'vue'
import Vuex from 'vuex'
import unique from './unique'
import socket from './socket.js'

Vue.use(Vuex)

const USER_KEY = 'user-identifier'
let userId = window.localStorage.getItem(USER_KEY) || unique.identifier()
window.localStorage.setItem(USER_KEY, userId)

const USER_NAME_KEY = 'user-name'
let userName = window.localStorage.getItem(USER_NAME_KEY) || unique.name()
window.localStorage.setItem(USER_NAME_KEY, userName)

const CONNECTED_KEY = 'users-connected'
let myUser = { userId: userId, userName: userName, connected: new Date(), status: 'connected' }
window.localStorage.setItem(CONNECTED_KEY, JSON.stringify([myUser]))

const NOTES_KEY = 'user-notes'
// 'ws://54.195.50.227:1234'
// 'ws://localhost:1234'
// 'ws://http://post-its-socket-server-demo.herokuapp.com:1234'
let connection = socket.connect('ws://localhost:1234', myUser)

let store = new Vuex.Store({
  state: {
    userId: userId,
    userName: userName,
    notes: JSON.parse(window.localStorage.getItem(NOTES_KEY) || '[]'),
    newNote: '',
    editingId: '',
    connection: connection,
    connectedUsers: JSON.parse(window.localStorage.getItem(CONNECTED_KEY)) || [myUser]
  },

  mutations: {
    GET_NOTE (state, note) {
      state.newNote = note
    },
    ADD_NOTE (state) {
      let newNote = {
        body: state.newNote,
        archived: false,
        created: new Date(),
        id: state.editingId || unique.identifier(),
        user: state.userId,
        userName: state.userName,
        removed: false
      }
      state.notes.push(newNote)
      window.localStorage.setItem(NOTES_KEY, JSON.stringify(state.notes))
      socket.send(connection, JSON.stringify(newNote))
    },
    EDIT_NOTE (state, note) {
      let notes = state.notes
      notes.splice(notes.indexOf(note), 1)
      state.notes = notes
      state.newNote = note.body
      state.editingId = note.id
      window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
    },
    REMOVE_NOTE (state, note) {
      note.removed = true
      socket.send(connection, JSON.stringify(note))
      let notes = state.notes
      notes.splice(notes.indexOf(note), 1)
      window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
    },
    ARCHIVE_NOTE (state, note) {
      let notes = state.notes
      for (let index = 0; index < notes.length; ++index) {
        if (notes[index].id === note.id) {
          notes[index].archived = !notes[index].archived
        }
      }
      window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
      socket.send(connection, JSON.stringify(note))
    },
    CLEAR_NOTE (state) {
      state.newNote = ''
    }
  },

  actions: {
    getNote ({commit}, note) {
      commit('GET_NOTE', note)
    },
    addNote ({commit}) {
      commit('ADD_NOTE')
    },
    editNote ({commit}, note) {
      commit('EDIT_NOTE', note)
    },
    removeNote ({commit}, note) {
      commit('REMOVE_NOTE', note)
    },
    archiveNote ({commit}, note) {
      commit('ARCHIVE_NOTE', note)
    },
    clearNote ({commit}) {
      commit('CLEAR_NOTE')
    }
  },

  getters: {
    newNote: state => state.newNote,
    notes: state => state.notes.filter((note) => { return !note.archived }),
    archivedNotes: state => state.notes.filter((note) => { return note.archived }),
    users: state => state.connectedUsers,
    myUserId: state => state.myUser.userId
  }
})

let isEquivalent = (a, b) => {
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let index = 0; index < aProps.length; index++) {
    let propName = aProps[index]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  // If we made it this far, objects are naively considered equivalent
  return true
}

connection.onmessage = function (message) {
  // try to parse JSON message. to make sure message is not chunked or otherwise damaged
  try {
    let incoming = JSON.parse(message.data)
    // if user message
    if (incoming.userId) {
      let users = store.state.connectedUsers
      let userExists = false
      for (let index = 0; index < users.length; index++) {
        if (users[index].userId === incoming.userId) {
          userExists = true
        }
      }
      if (!userExists) {
        store.state.connectedUsers.push(incoming)
        // and push out my user again so the new connected user sees me!
        connection.send(JSON.stringify(myUser))
        // and push out notes too?
        let notes = store.state.notes
        for (let index = 0; index < notes.length; index++) {
          connection.send(JSON.stringify(notes[index]))
        }
      }
    } else {
      // note message
      let incomingNote = incoming
      let notes = store.state.notes
      let exists = false
      let changed = false
      let removed = incomingNote.removed
      let position = 0
      for (let index = 0; index < notes.length; ++index) {
        if (notes[index].id === incomingNote.id) {
          position = index
          exists = true
          changed = !isEquivalent(notes[index], incomingNote)
        }
      }
      if (!exists & !removed) {
        // add via push
        notes.push(incomingNote)
      } else if (removed) {
        // remove via splice
        for (let index = 0; index < notes.length; ++index) {
          if (notes[index].id === incomingNote.id) {
            notes.splice(index, 1)
          }
        }
      } else if (changed) {
        // update via splice
        notes.splice(position, 1, incomingNote)
      }
      window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
    }
  } catch (e) {
    console.log('Error, either a bug or this isn\'t valid JSON: ', message.data)
  }
}

module.exports = store
