export const wait = async (ms = 1000): Promise<boolean> =>
  new Promise((resolve) => setTimeout(() => resolve(true), ms));
