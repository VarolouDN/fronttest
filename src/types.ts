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
  isAuth: boolean;
  authError: string;
};

type ClientsState = {
  clients: Client[];
  isLoading: boolean;
  activeId: string | null;
};

export type State = {
  auth: Auth;
  clients: ClientsState;
};
