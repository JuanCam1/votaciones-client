import { instance } from "../../utilities";

export const login = async (loginDto) => {
  return await instance.post("/login", loginDto, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
