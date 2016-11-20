import Vue from 'vue'
import Vuex from 'vuex'
import unique from './unique'

Vue.use(Vuex)

const STORAGE_KEY = 'notes-app'

export default new Vuex.Store({
  state: {
    notes: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
    newNote: ''
  },

  mutations: {
    GET_NOTE (state, note) {
      state.newNote = note
    },
    ADD_NOTE (state) {
      state.notes.push({
        body: state.newNote,
        archived: false,
        created: new Date(),
        id: unique()
      })
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.notes))
    },
    EDIT_NOTE (state, note) {
      let notes = state.notes
      notes.splice(notes.indexOf(note), 1)
      state.notes = notes
      state.newNote = note.body
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    },
    REMOVE_NOTE (state, note) {
      let notes = state.notes
      notes.splice(notes.indexOf(note), 1)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    },
    ARCHIVE_NOTE (state, note) {
      let notes = state.notes
      for (let index = 0; index < notes.length; ++index) {
        if (notes[index].id === note.id) {
          notes[index].archived = !notes[index].archived
        }
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
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
    archivedNotes: state => state.notes.filter((note) => { return note.archived })
  }

})
