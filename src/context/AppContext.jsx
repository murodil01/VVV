import { createContext, useContext } from 'react'

const AppContext = createContext({
  role: 'student',
  accentColor: '#00E5FF',
})

export const AppProvider = ({ children }) => {
  const contextValue = {
    role: 'student',
    accentColor: '#00E5FF',
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}
