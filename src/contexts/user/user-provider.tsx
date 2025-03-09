import { ReactNode, useMemo, useReducer } from "react";
// types
import { EUserContextType, IUserAction, IUserContext } from "@/types/context/user";
// utils
import user from "@/utils/users";
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
            user.getUserInfo("game_name"),
            user.getUserInfo("tag_line"),
            user.getUserInfo("sub"),
            user.getUserInfo("pp"),
            user.getUserInfo("radianite_point"),
            user.getUserInfo("valorant_point"),
            user.getUserInfo("kingdom_credit"),
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
