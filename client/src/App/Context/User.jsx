import React, { useState, createContext, useCallback, useMemo } from "react";
import axios from "axios";

export const UserContext = createContext([{ token: null }]);

const initialState = { token: null };

export default function UserProvider({ children }) {
  const [userState, setUserState] = useState(initialState);

  const submitLogin = useCallback(
    async (body) =>
      await axios
        .post(`${REACT_API_ENDPOINT}/users/login`, body, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .then(({ token }) => setUserState((prev) => ({ ...prev, token }))),
    []
  );

  const providerValue = useMemo(() => [userState, { submitLogin }], [
    userState,
  ]);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}
