import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [blocked, setBlocked] = useState(null)

  const login = useCallback((jwtToken, id, block)=>{
    setToken(jwtToken)
    setUserId(id)
    setBlocked(block)

    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken, userId: id, blocked: block
    }))
  },[])

  const logout = useCallback(()=>{
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  },[])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token && !data.block) {
      login(data.token, data.userId, data.block)
    }
  }, [login])

  return { login, logout, token, userId, blocked }
}