export const calculatePSV = pid => {
  const pidh = pid >>> 16;
  const pidl = pid & 0xffff;
  return (pidh ^ pidl) >>> 4;
};
