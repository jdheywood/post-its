import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    newNote: ''
  },

  mutations: {
    GET_NOTE (state, note) {
      state.newNote = note
    },
    ADD_NOTE (state) {
      state.notes.push({
        body: state.newNote,
        archived: false
      })
    },
    EDIT_NOTE (state, note) {
      var notes = state.notes
      notes.splice(notes.indexOf(note), 1)
      state.notes = notes
      state.newNote = note.body
    },
    REMOVE_NOTE (state, note) {
      var notes = state.notes
      notes.splice(notes.indexOf(note), 1)
    },
    ARCHIVE_NOTE (state, note) {
      note.archived = !note.archived
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
