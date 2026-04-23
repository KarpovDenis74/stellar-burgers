import {
  clearUser,
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userReducer
} from './user-slice';

describe('user reducer', () => {
  const user = { name: 'Денис', email: 'denis@example.com' };

  it('обрабатывает fetchUser.pending', () => {
    const state = userReducer(undefined, fetchUser.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('обрабатывает fetchUser.fulfilled', () => {
    const state = userReducer(
      undefined,
      fetchUser.fulfilled({ success: true, user }, '', undefined)
    );
    expect(state.user).toEqual(user);
    expect(state.isLoading).toBe(false);
  });

  it('обрабатывает login/register/logout и clearUser', () => {
    const loggedIn = userReducer(
      undefined,
      loginUser.fulfilled(user, '', user)
    );
    expect(loggedIn.user).toEqual(user);

    const registered = userReducer(
      undefined,
      registerUser.fulfilled(user, '', {
        name: user.name,
        email: user.email,
        password: '123'
      })
    );
    expect(registered.user).toEqual(user);

    const updated = userReducer(
      loggedIn,
      updateUser.fulfilled({ success: true, user }, '', { name: 'Денис 2' })
    );
    expect(updated.user).toEqual(user);

    const loggedOut = userReducer(
      updated,
      logoutUser.fulfilled(undefined, '', undefined)
    );
    expect(loggedOut.user).toBeNull();

    const cleared = userReducer(
      { ...loggedIn, authError: 'error', updateUserError: 'error' },
      clearUser()
    );
    expect(cleared.user).toBeNull();
    expect(cleared.authError).toBeNull();
    expect(cleared.updateUserError).toBeNull();
  });
});
