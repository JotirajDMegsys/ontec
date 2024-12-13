import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addUpdateProperty } from '../../helpers/fakebackend_helper'


//*Action

// export const addProperty = createAsyncThunk("addProperty", async(data) => {
    
//     try {
//         const response = await addUpdateProperty(data);
//         console.log('get response==================', response);
//         return response;

//     } catch (error) {
//         console.log("=====I am here===========================")
//         console.log("error123-----", error)
//         return Promise.reject(new Error(JSON.stringify(error)))
//     }
// })

export const addProperty = createAsyncThunk("addProperty", async (data) => {

    try {
        const response = await addUpdateProperty(data);
        // console.log('get response');
        return response;

    } catch (error) {
        console.log("error123-----", error)
        return Promise.reject(new Error(JSON.stringify(error)))
    }
})


export const resetAddPropertyState = createAsyncThunk("resetAddPropertyState", async () => {
    return {};
});

const addPropertySlice = createSlice({
    name: 'addProperty',
    initialState: {
        isLoading: false,
        data: {},
        isSuccess: false,
        isError: false,
        // error
    },
    reducers:{
        clearStates:(state)=>{
            state.data = {}
            state.isLoading= false,
            state.isSuccess= false,
            state.isError=false


        }
    },
    extraReducers: (builder) => {

        builder.addCase(addProperty.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });

        builder.addCase(addProperty.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isSuccess = true;
            state.isError = false;
        });

        builder.addCase(addProperty.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.data = JSON.parse(action.error.message) ? JSON.parse(action.error.message) : null;

        });

        builder.addCase(resetAddPropertyState.fulfilled, (state, action) => {
            return {
                isLoading: false,
                data: {},
                isSuccess: false,
                isError: false,
            };
        });

    }
});


export const {clearStates} =addPropertySlice.actions

export default addPropertySlice.reducer;

