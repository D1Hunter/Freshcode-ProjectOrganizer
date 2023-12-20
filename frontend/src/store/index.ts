import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./reducers/auth/auth.reducer";
import thunk from "redux-thunk";
import { boardReducer } from "./reducers/board/board.reducer";
import { listReducer } from "./reducers/list/list.reducer";
import { cardReducer } from "./reducers/card/card.reducer";
import { activityReducer } from "./reducers/activity/activity.reducer";
import { commentReducer } from "./reducers/comment/comment.reducer";

const rootReducer = combineReducers({
    authReducer:authReducer,
    boardReducer:boardReducer,
    listReducer:listReducer,
    cardReducer:cardReducer,
    activityReducer:activityReducer,
    commentReducer:commentReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch