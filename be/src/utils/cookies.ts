import type { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
	sameSite: "strict",
	httpOnly: true,
	secure,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
	...defaults,
	expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
	...defaults,
	expires: thirtyDaysFromNow(),
	path: "/auth/refresh",
});

const refreshPath = "/auth/refresh";

type Params = {
	res: Response;
	accessToken: string;
	refreshToken: string;
};

export const setAuthCookie = ({ res, accessToken, refreshToken }: Params) => {
	return res
		.cookie("accessToken", accessToken, {
			sameSite: "strict",
			httpOnly: true,
			secure,
			maxAge: fifteenMinutesFromNow().getMilliseconds(),
		})
		.cookie("refreshToken", refreshToken, {
			sameSite: "strict",
			httpOnly: true,
			secure,
			maxAge: thirtyDaysFromNow().getMilliseconds(),
			path: refreshPath,
		});
};

export const clearAuthCookies = (res: Response) => {
	return res.clearCookie("accessToken").clearCookie("refreshToken", {
		path: refreshPath,
	});
};
