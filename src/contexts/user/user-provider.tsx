import * as SecureStore from "expo-secure-store";
import { ReactNode, useMemo, useReducer } from "react";
// types
import { EUserContextType, IUserAction, IUserContext } from "@/types/context/user";
//
import { initialUserState, UserContext } from "./user-context";

const reducer = (state: IUserContext, action: IUserAction<EUserContextType>) => {
    let ac;

    switch (action.type) {
        case EUserContextType.INITIAL:
            ac = action as IUserAction<EUserContextType.INITIAL>;

            return {
                ...state,
                ...ac.payload,
            };
        default:
            return state;
    }
};

// ----------------------------------------------------------------------

type UserProviderProps = {
    children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialUserState);

    const initialize = async () => {

        const [
            gameName,
            tagLine,
            pp,
            sub,
            radianitePoint,
            valorantPoint,
            kingdomCredit,
        ] = await Promise.all([
            SecureStore.getItemAsync("game_name"),
            SecureStore.getItemAsync("tag_line"),
            SecureStore.getItemAsync("sub"),
            SecureStore.getItemAsync("pp"),
            SecureStore.getItemAsync("radianite_point"),
            SecureStore.getItemAsync("valorant_point"),
            SecureStore.getItemAsync("kingdom_credit"),
        ]);

        dispatch({
            type: EUserContextType.INITIAL,
            payload: {
                gameName,
                tagLine,
                pp,
                sub,
                balance: {
                    radianitePoint,
                    valorantPoint,
                    kingdomCredit,
                },
            },
        });
    };

    const memoizedValue = useMemo(
        () => ({
            ...state,
            initialize,
        }),
        [
            state,
            state.initialize,
        ],
    );

    return (
        <UserContext.Provider value={memoizedValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
