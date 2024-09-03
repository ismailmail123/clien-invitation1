import { combineReducers, configureStore} from '@reduxjs/toolkit';
import recipientReducer from '../redux/recipient/sliceRecipient'


const rootReducer = combineReducers({
    listRecipient: recipientReducer,

});

export default configureStore({
    reducer: rootReducer,
})