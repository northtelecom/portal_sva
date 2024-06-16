export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
