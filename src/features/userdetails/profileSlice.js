
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    alternateMobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            return { ...state, ...action.payload };
        },
   
    },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
