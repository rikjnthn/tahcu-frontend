import { Dispatch, createContext, useContext, useReducer } from "react";

const initialHomePageState = {
  isOpenChatContact: true,
  isOpenCreateGroup: false,
  isOpenCreatePrivateChat: false,
};

const reducer = (
  state: HomePageStateType,
  action: ActionType
): HomePageStateType => {
  switch (action.type) {
    case "SET_OPEN_CHAT_CONTACT":
      return {
        isOpenChatContact: true,
        isOpenCreateGroup: false,
        isOpenCreatePrivateChat: false,
      };
    case "SET_OPEN_CREATE_GROUP":
      return {
        isOpenChatContact: false,
        isOpenCreateGroup: true,
        isOpenCreatePrivateChat: false,
      };
    case "SET_OPEN_CREATE_PRIVATE_CHAT":
      return {
        isOpenChatContact: false,
        isOpenCreateGroup: false,
        isOpenCreatePrivateChat: true,
      };

    default:
      return state;
  }
};

const HomePageContext = createContext<HomePageStateType>(initialHomePageState);

const HomePageDispatchContext = createContext<Dispatch<ActionType>>(
  ({ type }) => {}
);

export const useHomePage = () => {
  return useContext(HomePageContext);
};

export const useHomePageDispatch = () => {
  return useContext(HomePageDispatchContext);
};

export const HomePageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [homePageState, dispatch] = useReducer(reducer, initialHomePageState);

  return (
    <HomePageContext.Provider value={homePageState}>
      <HomePageDispatchContext.Provider value={dispatch}>
        {children}
      </HomePageDispatchContext.Provider>
    </HomePageContext.Provider>
  );
};

interface ActionType {
  type:
    | "SET_OPEN_CHAT_CONTACT"
    | "SET_OPEN_CREATE_GROUP"
    | "SET_OPEN_CREATE_PRIVATE_CHAT";
}

interface HomePageStateType {
  isOpenChatContact: boolean;
  isOpenCreateGroup: boolean;
  isOpenCreatePrivateChat: boolean;
}
