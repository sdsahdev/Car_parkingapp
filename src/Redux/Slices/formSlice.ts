import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FormState {
  fullName: string;
  nickname: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  gender: string;
  countrycode: string;
  countryname: string;
  createEmail: string;
  createPassword: string;
  img: string;
}

interface User extends FormState {
  id: string;
}

interface FormSliceState {
  formData: FormState;
  registeredUsers: User[];
}
interface ChangePasswordPayload {
  id: string;
  newPassword: string;
}

const initialFormState: FormState = {
  fullName: '',
  nickname: '',
  dateOfBirth: '',
  email: '',
  phoneNumber: '',
  gender: '',
  countrycode: '',
  countryname: '',
  createEmail: '',
  createPassword: '',
  img: '',
};

const initialState: FormSliceState = {
  formData: initialFormState,
  registeredUsers: [],
};

type FormField = keyof FormState;

interface UpdateFormPayload {
  field: FormField;
  value: string;
}

interface RegisterUserPayload extends FormState {
  id: string;
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormField: (state, action: PayloadAction<UpdateFormPayload>) => {
      const {field, value} = action.payload;
      state.formData[field] = value;
    },
    registerUser: (state, action: PayloadAction<RegisterUserPayload>) => {
      state.registeredUsers.push(action.payload);
      state.formData = initialFormState; // Reset form data after registration
    },
  },
});

export const {updateFormField, registerUser} = formSlice.actions;

export default formSlice.reducer;
