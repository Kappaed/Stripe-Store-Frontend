import { useEffect, createContext, useState } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          setLoading(false);
        });
      } else {
        setUser(userAuth);
        setLoading(false);
      }
    });
    return () => unsubFromAuth();
  }, []);

  const userContext = { user, loading };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
