import { createSlice } from '@reduxjs/toolkit';

const initial = {
  data: [],
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: initial,
  reducers: {
    add({ data }, { payload }) {
      data.push(payload);
    },
    remove(state, action) {
      state.data = state.data.filter(
        contact => contact.contactId !== action.payload
      );
    },
  },
});

export const { add, remove } = contactSlice.actions;
export const contactSliceReducer = contactSlice.reducer;

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload; // Зберігаємо ім'я для фільтрації
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;


export const getContacts = store => store.contacts;
