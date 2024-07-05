// reducers/parkingReducer.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance?: string;
  rate: string;
  latitude: number;
  longitude: number;
  save?: boolean;
  booking: boolean;
  status: number;
  time: string;
}
export interface Bookingstatus {
  id: string;
  booking: boolean;
  status: number;
  time: string;
}
interface ParkingState {
  data: ParkingSpot[];
  selectedParking: ParkingSpot;
}

interface UpdateParkingSpotPayload {
  id: string;
  property: any;
  value: string | number | boolean;
}
const currentLat = 18.578945439415897;
const currentLon = 73.74012143067323;

const generateRandomLatLon = (baseLat: number, baseLon: number) => {
  const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
  const lonOffset = (Math.random() - 0.5) * 0.01;
  return {
    latitude: baseLat + latOffset,
    longitude: baseLon + lonOffset,
  };
};
const initialState: ParkingState = {
  data: [
    {
      id: '1',
      name: 'Campion Cottages',
      address: '1324 Antonietta Rest',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$2.22/hour',
    },
    {
      id: '2',
      name: 'De Lara Way',
      address: '85043 Kuhlman Key Apt. 375',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$2.42/hour',
    },
    {
      id: '3',
      name: 'Edward Brambles',
      address: '73405 Kiback Forks',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$1.32/hour',
    },
    {
      id: '4',
      name: 'Oak Tree Parc',
      address: '43822 Hirthe Harbor APT. 53',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$2.48/hour',
    },
    {
      id: '5',
      name: 'Hopton Hollies',
      address: '21290 Gutmann Lan',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$2.70/hour',
    },
    {
      id: '6',
      name: 'Blake Valley',
      address: '623 Haillie Park',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$1.48/hour',
    },
    {
      id: '7',
      name: 'North Grove Way',
      address: '216 Sage Alley',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$2.72/hour',
    },
    {
      id: '8',
      name: 'Willam Bush Close',
      address: '687 Joaquin Parts',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$2.87/hour',
    },
    {
      id: '9',
      name: 'Palmerston Lawn',
      address: '8395 Trantow Courts',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$2.78/hour',
    },
    {
      id: '10',
      name: 'Appleton Warren',
      address: '7734 Harris Gardens Suite 114',
      ...generateRandomLatLon(currentLat, currentLon),
      rate: '$1.99/hour',
    },
  ],
  selectedParking: {
    id: '1',
    name: 'Campion Cottages',
    address: '1324 Antonietta Rest',
    ...generateRandomLatLon(currentLat, currentLon),
    rate: '$2.22/hour',
    save: false,
    booking: false,
    latitude: 0,
    longitude: 0,
    status: 0,
    time: '0',
    distance: '0',
  },
};

const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    setParkingData(state, action: PayloadAction<ParkingSpot[]>) {
      state.data = action.payload;
    },
    setSelected(state, action: PayloadAction<ParkingSpot>) {
      state.selectedParking = action.payload;
    },
    updateParkingSpotProperty(
      state,
      action: PayloadAction<UpdateParkingSpotPayload>,
    ) {
      const {id, property, value} = action.payload;
      const spot = state.data.find(spot => spot.id === id);
      console.log(value, '===before==');
      if (spot) {
        spot[property] = value;
        state.selectedParking = spot;
      }
      console.log(spot, '===after==');
    },
    AddBookingStatus(state, action: PayloadAction<Bookingstatus>) {
      const {id, booking, status, time} = action.payload;
      console.log(id, booking, status, time);
      const checkData = state.data?.find(i => i.id == id);
      console.log(checkData, '===checkdata');

      if (checkData) {
        checkData.booking = booking;
        checkData.status = status;
        checkData.time = time;
      }
    },
  },
});

export const {
  setParkingData,
  setSelected,
  updateParkingSpotProperty,
  AddBookingStatus,
} = parkingSlice.actions;

export default parkingSlice.reducer;
