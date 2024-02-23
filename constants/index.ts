export const COOKIE_NAME = "OurSiteJWT"
export const MAX_AGE = 60* 60 * 24 * 30 // 30 jours
export const SECRET = process.env.JWT_SECRET || "";
