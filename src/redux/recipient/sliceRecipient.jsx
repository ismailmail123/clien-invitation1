import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const recipientSlice = createSlice({
    name: 'listRecipient',
    initialState: {
        recipients: [],
        recipientItem: [],
    },
    reducers: {
        add(state, action){
            const currentRecipient = [...state.recipients];
            const newRecipient = {
                ...action.payload,
                createdAt: dayjs().format(),
            }
            currentRecipient.push(newRecipient);
            state.recipients = currentRecipient;
        },
        remove(state, action){
            const currentRecipients = [...state.recipients];
            const { index } = action.payload;
            currentRecipients.splice(index, 1);
            state.recipients = currentRecipients;
        },
        update (state, action){
            const currentRecipients = [...state.recipients];
            const {index, ...recipientItem} = action.payload;
            currentRecipients[index] = recipientItem
            state.recipients = currentRecipients;
        },
        setRecipientItem(state, action){
            state.recipientItem = { ...action.payload };
        
        },
    },
    

})

export const { add, remove, update, setRecipientItem } = recipientSlice.actions;

export default recipientSlice.reducer;