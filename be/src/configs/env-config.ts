const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (!value) throw new Error(`Missing env variable ${key}`);

  return value;
};

export const env = {
  PORT: getEnv('PORT'),
  NODE_ENV: getEnv('NODE_ENV'),
  CSB_API_KEY: getEnv('CSB_API_KEY'),
};

export default env;
