
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information and set it in the state
    axios
      .get('http://localhost:3001/me', {
        withCredentials: true,
        headers: {
          // 'Authorization': sessionStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        setUser({
          id: result.data.id,
          name: result.data.name,
          teacher_id: result.data.teacher_id,
        });
      })
      .catch(err => {
        console.log('Server error:', err);
      });
  }, []);
  const updateUser = (userData) => {
    setUser(userData);
  };
  // Render the child components only if the user data is available
  return user ? (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  ) : (
    <div>Loading user data...</div>
  );
}

