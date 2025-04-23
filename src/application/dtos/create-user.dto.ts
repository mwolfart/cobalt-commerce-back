export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
  state: string;
  avatar?: string;
};
