import bcrypt from "bcrypt";

export const hashvalue = async (value: string, saltRound?: number) =>
	bcrypt.hash(value, saltRound || 10);

export const compareValue = async (value: string, hashedPassword: string) =>
	bcrypt.compare(value, hashedPassword).catch(() => false);
