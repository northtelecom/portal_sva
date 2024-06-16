import { User } from './User';

export interface UserSupervisor {
  id: string;
  supervisor: User;
  supervisor_id: string;
  user: User;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
