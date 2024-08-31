import type { SortBy } from "./constants"

export interface APIResponse {
  results: User[];
  info:    Info;
}

export interface Info {
  seed:    string;
  results: number;
  page:    number;
  version: string;
}

export interface User {
  gender:     Gender;
  name:       Name;
  location:   Location;
  email:      string;
  login:      Login;
  dob:        Dob;
  registered: Dob;
  phone:      string;
  cell:       string;
  id:         ID;
  picture:    Picture;
  nat:        string;
  isDeleted?: boolean;
}

export interface Dob {
  date: Date;
  age:  number;
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export interface ID {
  name:  string;
  value: null | string;
}

export interface Location {
  street:      Street;
  city:        string;
  state:       string;
  country:     string;
  postcode:    number | string;
  coordinates: Coordinates;
  timezone:    Timezone;
}

export interface Coordinates {
  latitude:  string;
  longitude: string;
}

export interface Street {
  number: number;
  name:   string;
}

export interface Timezone {
  offset:      string;
  description: string;
}

export interface Login {
  uuid:     string;
  username: string;
  password: string;
  salt:     string;
  md5:      string;
  sha1:     string;
  sha256:   string;
}

export interface Name {
  title: Title;
  first: string;
  last:  string;
}

export enum Title {
  MS = "Ms",
  Madame = "Madame",
  Miss = "Miss",
  Monsieur = "Monsieur",
  Mr = "Mr",
  Mrs = "Mrs",
}

export interface Picture {
  large:     string;
  medium:    string;
  thumbnail: string;
}

export interface State {
  users: User[];
  isColorActive: boolean;
  sortProperty: SortBy;
  filterCountryValue: string;
}

export type Action =
| { type: 'SET_FETCHED_USERS', payload: User[] }
| { type: 'SET_COLORS' }
| { type: 'SET_SORT_PROPERTY', payload: SortBy }
| { type: 'DELETE_ROW', payload: string}
| { type: 'RECOVER_DELETES' }
| { type: 'FILTER_USERS_BY_COUNTRY', payload: string }

export interface ContextProps {
  state: State,
  dispatch: React.Dispatch<Action>
}

export interface UsersProviderProps {
  children: React.ReactNode
}
