import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Images from '../../Images';
import {IvehicleChange} from './vehicleSlice';

export interface Ipayment {
  id: string;
  name: string;
  select: boolean;
  img: any;
}

interface IpaymentArray {
  payments: Ipayment[];
}
const defaltdata = [
  {
    id: '1',
    name: 'Google Pay',
    select: true,
    img: Images.google,
  },
  {id: '2', name: 'Apple', select: false, img: Images.apple},
  {id: '3', name: 'Paypal', select: false, img: Images.paypal},
];
const initialState: IpaymentArray = {
  payments: defaltdata,
};

const PaymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<Ipayment>) => {
      state.payments.push(action.payload);
    },
    resetData: state => {
      state.payments = defaltdata;
    },
    changeValue(state, action: PayloadAction<IvehicleChange>) {
      const {id, property, value} = action.payload;
      state.payments.forEach(spot => (spot.select = false));
      const trueSelect = state.payments.find(spot => spot.id == id);
      console.log(id, property, value, '===before==');
      if (trueSelect) {
        trueSelect[property] = value;
      }
    },
  },
});

export const {addPayment, resetData, changeValue} = PaymentSlice.actions; // export actions
export default PaymentSlice.reducer;
