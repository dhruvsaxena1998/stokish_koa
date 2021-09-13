import Router from "@koa/router";

const userRoutes = new Router({
  prefix: "/users",
});

userRoutes.get("/", async (ctx) => {
  ctx.body = "Hello User";
});

export { userRoutes };
