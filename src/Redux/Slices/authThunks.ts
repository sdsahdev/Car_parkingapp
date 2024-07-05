import {AppDispatch, RootState} from '../Store/store';
import {loginStart, loginSuccess, loginFailure} from '../Slices/authSlice';

export const login =
  (email: string, password: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(loginStart());

    const state = getState();
    const users = state.form.registeredUsers;

    const user = users.find(
      user => user.createEmail === email && user.createPassword === password,
    );

    if (user) {
      const token = 'dummyToken123';
      dispatch(
        loginSuccess({
          user: {
            id: user.id,
            email: user.createEmail,
            password: user.createPassword,
          },
          token,
        }),
      );
    } else {
      // Check if the email is incorrect
      const existingUser = users.find(user => user.createEmail === email);

      if (!existingUser) {
        dispatch(loginFailure('Email does not exist'));
        return;
      }

      // Check if the password is incorrect
      if (existingUser.createPassword !== password) {
        dispatch(loginFailure('Incorrect password'));
        return;
      }
    }
  };
