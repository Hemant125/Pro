import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    setItems: (state, action) => action.payload,

    //  with this New item will be added on top  
    addItem: (state, action) => [action.payload, ...state], 
    updateItem: (state, action) => {
      return state.map(item => 
        item.id === action.payload.id 
          ? { ...item, name: action.payload.name, description: action.payload.description } 
          : item
      );
    },
    
    
    deleteItem: (state, action) => state.filter(item => item.id !== action.payload),
  },
});

export const { setItems, addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;

