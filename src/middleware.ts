import { defineMiddleware } from "astro:middleware";
import { auth } from "@/auth";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
	const isAuthed = await auth.api
		.getSession({
			headers: context.request.headers,
		})
		.catch((_e) => {
			return null;
		});
	if (context.url.pathname === "/dashboard" && !isAuthed) {
		return context.redirect("/");
	}
	return next();
});
