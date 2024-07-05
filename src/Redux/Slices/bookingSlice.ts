import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Ibooking {
  id: string;
  flor: string;
  boxname: string;
  status: number;
}
export interface IbookChange {
  id: string;
  value: number;
}
export interface BookingState {
  bookparking: Ibooking[];
}

const generateMockBookings = (): Ibooking[] => {
  const mockBookings: Ibooking[] = [];
  const floors = ['A', 'B', 'C'];
  let idCounter = 1;

  for (let i = 0; i < floors.length; i++) {
    for (let j = 1; j <= 12; j++) {
      const flor = i + 1;
      const boxLetter = floors[i];
      const boxNumber = j < 10 ? `0${j}` : `${j}`;
      const status = (j % 3) + 1;

      mockBookings.push({
        id: idCounter.toString(),
        flor: flor.toString(),
        boxname: `${boxLetter}${boxNumber}`,
        status,
      });

      idCounter++;
    }
  }

  return mockBookings;
};

export const dummyData = generateMockBookings();
console.log(dummyData, '==dumy data');

const initialState: BookingState = {
  bookparking: generateMockBookings(),
};
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setbooking(state, action: PayloadAction<Ibooking>) {
      state.bookparking.push(action.payload);
    },
    setChange(state, action: PayloadAction<IbookChange>) {
      const sort = state.bookparking.find(i => i.id == action.payload.id);
      if (sort) {
        sort.status = action.payload.value;
      }
    },
    resetstate(state) {
      state.bookparking = dummyData;
    },
  },
});

export const {setbooking, setChange, resetstate} = bookingSlice.actions;

export default bookingSlice.reducer;
