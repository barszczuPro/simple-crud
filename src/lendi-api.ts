import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { Api } from "@/types/api-types";
import User = Api.User;
import Auth = Api.Auth;

const base_url = "http://lendi-recruitment.azurewebsites.net/";
const authInstance: AxiosInstance = axios.create({
  baseURL: base_url,
});
const userInstance: AxiosInstance = axios.create({
  baseURL: `${base_url}/api`,
});
const login = (
  payload: Auth.Requests.LoginRequest
): AxiosPromise<Auth.Responses.JWTResponse> => {
  return authInstance.post("token", payload, {});
};

userInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const { data } = await login({
    username: "rbarszczowski",
    password: "Finanse#@!01379412",
  });
  config.headers = {
    Authorization: `Bearer ${data.access_token}`,
  };
  return config;
});

export interface Apis {
  fetchUsers(): AxiosPromise<Array<User.Responses.User>>;
  createUser(
    payload: User.Requests.UserEditRequest
  ): AxiosPromise<User.Responses.User>;
  fetchSingleUser(id: string): AxiosPromise<User.Responses.User>;
  removeUser(id: string): AxiosPromise<void>;
  updateUser(
    id: string,
    payload: User.Requests.UserEditRequest
  ): AxiosPromise<void>;
}

export default {
  fetchUsers(): AxiosPromise<Array<User.Responses.User>> {
    return userInstance.get("/users");
  },
  createUser(
    payload: User.Requests.UserEditRequest
  ): AxiosPromise<User.Responses.User> {
    return userInstance.post("/users", payload);
  },
  fetchSingleUser(id: string): AxiosPromise<User.Responses.User> {
    return userInstance.get(`/users/${id}`);
  },
  removeUser(id: string): AxiosPromise<void> {
    return userInstance.delete(`/users/${id}`);
  },
  updateUser(
    id: string,
    payload: User.Requests.UserEditRequest
  ): AxiosPromise<void> {
    return userInstance.put(`/users/${id}`, payload);
  },
} as Apis;
