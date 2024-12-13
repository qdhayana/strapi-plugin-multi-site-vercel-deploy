"use strict";

module.exports = {
  getConfig(ctx) {
    ctx.body = strapi
      .plugin("multi-site-vercel-deploy")
      .service("config")
      .getConfig();
  },
};
