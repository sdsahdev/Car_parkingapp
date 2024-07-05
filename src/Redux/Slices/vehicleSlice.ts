import {ImageSourcePropType} from 'react-native';
import Images from '../../Images';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Ivehicle {
  id: string;
  name: string;
  number: string;
  select: boolean;
  img: ImageSourcePropType;
}
export interface IvehicleChange {
  id: string;
  property: any;
  value: any;
}

export interface VehicleState {
  vehicles: Ivehicle[];
}
const initialState: VehicleState = {
  vehicles: [],
};
const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicle(state, action: PayloadAction<Ivehicle>) {
      state.vehicles.push(action.payload);
    },
    deleteVehicle(state, action: PayloadAction<string>) {
      state.vehicles = state.vehicles.filter(i => i.id != action.payload);
    },
    changeValue(state, action: PayloadAction<IvehicleChange>) {
      const {id, property, value} = action.payload;
      const spot = state.vehicles.forEach(spot => (spot.select = false));
      const trueSelect = state.vehicles.find(spot => spot.id == id);
      console.log(id, property, value, '===before==');
      if (trueSelect) {
        trueSelect[property] = value;
      }
    },
  },
});
export const {setVehicle, changeValue, deleteVehicle} = vehicleSlice.actions;
export default vehicleSlice.reducer;
