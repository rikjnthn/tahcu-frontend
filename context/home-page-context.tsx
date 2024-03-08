import { Dispatch, createContext, useContext, useReducer } from "react";

const initialHomePageState = {
  isOpenChatContact: true,
  isOpenCreateGroup: false,
  isOpenCreatePrivateChat: false,
  isOpenUserProfile: false,
  isOpenSetting: false,
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
        isOpenUserProfile: false,
        isOpenSetting: false,
      };
    case "SET_OPEN_CREATE_GROUP":
      return {
        isOpenChatContact: false,
        isOpenCreateGroup: true,
        isOpenCreatePrivateChat: false,
        isOpenUserProfile: false,
        isOpenSetting: false,
      };
    case "SET_OPEN_CREATE_PRIVATE_CHAT":
      return {
        isOpenChatContact: false,
        isOpenCreateGroup: false,
        isOpenCreatePrivateChat: true,
        isOpenUserProfile: false,
        isOpenSetting: false,
      };
    case "SET_OPEN_PROFILE":
      return {
        isOpenChatContact: false,
        isOpenCreateGroup: false,
        isOpenCreatePrivateChat: false,
        isOpenUserProfile: true,
        isOpenSetting: false,
      };

    case "SET_OPEN_SETTING":
      return {
        isOpenChatContact: false,
        isOpenCreateGroup: false,
        isOpenCreatePrivateChat: false,
        isOpenUserProfile: false,
        isOpenSetting: true,
      };

    default:
      return state;
  }
};

const HomePageContext = createContext<HomePageStateType | null>(null);

const HomePageDispatchContext = createContext<Dispatch<ActionType> | null>(
  null
);

export const useHomePage = () => {
  const context = useContext(HomePageContext);
  if (!context)
    throw new Error("useHomePage must be used within a HomePageProvider");
  return context;
};

export const useHomePageDispatch = () => {
  const context = useContext(HomePageDispatchContext);
  if (!context)
    throw new Error(
      "useHomePageDispatch must be used within a HomePageProvider"
    );
  return context;
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
    | "SET_OPEN_CREATE_PRIVATE_CHAT"
    | "SET_OPEN_PROFILE"
    | "SET_OPEN_SETTING";
}

interface HomePageStateType {
  isOpenChatContact: boolean;
  isOpenCreateGroup: boolean;
  isOpenCreatePrivateChat: boolean;
  isOpenUserProfile: boolean;
  isOpenSetting: boolean;
}
