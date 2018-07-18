import Cookies from 'js-cookie'

//const tokenName = 'adminNo'

export default {
  getToken: (tokenName) => {
    return Cookies.get(tokenName)
  },
  setToken: (tokenName,token) => {
    return Cookies.set(tokenName, token)
  },
  removeToken: (tokenName) => {
    return Cookies.remove(tokenName)
  }
}
