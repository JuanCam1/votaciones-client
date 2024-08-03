export const validateStatus = (code) => {
  if (!code) return true;
  
  const status = [404, 500];
  return status.includes(code);
};
