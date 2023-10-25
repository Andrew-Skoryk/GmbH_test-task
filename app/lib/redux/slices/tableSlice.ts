import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/api';

type TableState = {
  data: TableDataResponse | null,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
}

const initialState: TableState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("table/fetchData", async () => {
  const response = await api.get("table/");

  return response.data;
});

export const updateData = createAsyncThunk(
  "table/updateData",
  async (updatedRow: TableData) => {
    console.log("Payload:", updatedRow);
    const response = await api.put(`table/${updatedRow.id}/`, updatedRow);

    
    return response.data;
  }
);


const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch Data
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })

    // Update Data
      .addCase(updateData.pending, (_state) => {
        // Handle pending state if needed
      })
      .addCase(updateData.fulfilled, (state, action) => {
        if (state.data) {
          const updatedRow = action.payload;
          const index = state.data.results.findIndex(row => row.id === updatedRow.id);

          if (index !== -1) {
            state.data.results[index] = updatedRow;
          }
        }
      })
      .addCase(updateData.rejected, (state, action) => {
        state.error = action.error.message || null;
      });
    }, 
});



export default tableSlice.reducer;
