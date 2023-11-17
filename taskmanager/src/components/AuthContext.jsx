import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const addCompletedTask = (task) => {
    setCompletedTasks([...completedTasks, task]);
  };

  return (
    <AuthContext.Provider value={{ completedTasks, addCompletedTask }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
