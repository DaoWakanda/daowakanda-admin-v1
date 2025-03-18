export function maskString(str:string) {
  if (str.length <= 8) return str; 
  return str.slice(0, 4) + "...." + str.slice(-4);
}