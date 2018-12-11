import { routerRedux } from 'dva/router';
import Cookie from '../utils/cookie';
import { login } from '../services/login';

const cookieCachedState = {
  roles: JSON.parse(Cookie.getItem('roles'))
}
window.store = { ...window.store, ...cookieCachedState }

export default {
  namespace: 'login',
  state: cookieCachedState,
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return { roles: null }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { loginName, userName } = yield call(login, payload);
      Cookie.setItem('roles', JSON.stringify(userName));
      window.store = { ...window.store, loginName, userName, }
      yield put({ type: 'save', payload: { loginName, userName } })
      yield put(routerRedux.push('/dashboard'))
    },
    *logout(action, { put }) {
      Cookie.removeItem('roles')
      Cookie.removeItem('token')
      window.store = { ...window.store, userName: null  }
      yield put({ type: 'clear' })
      yield put(routerRedux.push('/login'))
    }
  },
};
