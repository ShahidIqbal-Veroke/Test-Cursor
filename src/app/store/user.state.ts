import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

export const initialUserState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null
}; 