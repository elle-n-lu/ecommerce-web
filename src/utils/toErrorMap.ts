import { errors } from "../pages/signIn";

export const toErrorMap = (er: errors) => {
  const errorMap: Record<string, string> = {};
  er.errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
