export type Client = {
  _id: string;
  name: string;
  id: number;
  email: string;
  phone: string;
  username: string;
};

export type Clients = Client[];

export type Auth = {
  userName: string;
  password: string;
  isAuth: IsAuth;
  authError: string;
};

export type ClientsState = {
  clients: Client[] | [];
  isLoading: IsLoading;
  activeId: ActiveId;
};

export type State = {
  auth: Auth;
  clients: ClientsState;
};
export type ActiveId = string | null;

export type IsLoading = boolean;

export type IsAuth = boolean;
