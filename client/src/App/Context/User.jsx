import React, { useState, createContext, useCallback, useMemo } from "react";
import axios from "axios";

export const UserContext = createContext([{ token: null }]);

const initialState = { token: null };

export default function UserProvider({ children }) {
  const [userState, setUserState] = useState(initialState);

  const submitLogin = useCallback(
    async ({ email, password }) =>
      await axios
        .post(
          "/users/login",
          { username: email, password },
          { withCredentials: true }
        )
        .then((res) => res.data)
        .then(({ token }) => setUserState((prev) => ({ ...prev, token }))),
    []
  );

  const verifyUser = useCallback(async () => {
    await axios
      .post("/users/refreshToken")
      .then((res) => res.data)
      .then(({ token }) => {
        setUserState((prev) => ({ ...prev, token }));

        setTimeout(verifyUser * 5 * 1000);
      });
  }, []);

  const providerValue = useMemo(
    () => [userState, { submitLogin, verifyUser }],
    [userState]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}
