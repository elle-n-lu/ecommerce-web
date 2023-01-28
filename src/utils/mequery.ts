import axios from "axios";

export const meque = async (setName: (any: any) => any) => {
  const res = await axios
    .get(`${process.env.URL as string}api/user/me`, {
      withCredentials: true,
    })
    .catch((err) => {
      console.log(err.message);
    });
  if (!res) {
    return;
  } else {
    setName(res.data);

    return res.data;
  }
};
