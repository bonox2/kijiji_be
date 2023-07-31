"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core7 = require("@keystone-6/core");

// src/api/Ad/Ad.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var Ad = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    createdAt: (0, import_fields.timestamp)({ defaultValue: { kind: "now" } }),
    title: (0, import_fields.text)(),
    description: (0, import_fields.text)(),
    price: (0, import_fields.text)(),
    coverImg: (0, import_fields.image)({ storage: "local_images" }),
    views: (0, import_fields.integer)({ defaultValue: 0 }),
    extraData: (0, import_fields.json)({ defaultValue: {} }),
    address: (0, import_fields.text)(),
    seller: (0, import_fields.relationship)({ ref: "Seller.ads" }),
    images: (0, import_fields.relationship)({ ref: "Image.ad", many: true }),
    category: (0, import_fields.relationship)({ ref: "Category.ads" }),
    subcategory: (0, import_fields.relationship)({ ref: "Subcategory.ads" })
  }
});

// src/api/Category/Category.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Category = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields2.text)(),
    subcategories: (0, import_fields2.relationship)({ ref: "Subcategory.category", many: true }),
    ads: (0, import_fields2.relationship)({ ref: "Ad.category", many: true })
  }
});

// src/api/Subcategory/Subcategory.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Subcategory = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields3.text)(),
    category: (0, import_fields3.relationship)({ ref: "Category.subcategories" }),
    ads: (0, import_fields3.relationship)({ ref: "Ad.subcategory", many: true })
  }
});

// src/api/User/User.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var User = (0, import_core4.list)({
  access: import_access4.allowAll,
  fields: {
    name: (0, import_fields4.text)(),
    email: (0, import_fields4.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields4.password)(),
    createdAt: (0, import_fields4.timestamp)({
      defaultValue: { kind: "now" }
    }),
    seller: (0, import_fields4.relationship)({ ref: "Seller.user" })
  }
});

// src/api/Seller/Seller.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var Seller = (0, import_core5.list)({
  access: import_access5.allowAll,
  fields: {
    firstName: (0, import_fields5.text)(),
    lastName: (0, import_fields5.text)(),
    avatar: (0, import_fields5.image)({ storage: "local_images" }),
    phoneNumber: (0, import_fields5.text)(),
    ratings: (0, import_fields5.json)({ defaultValue: {} }),
    user: (0, import_fields5.relationship)({ ref: "User.seller" }),
    ads: (0, import_fields5.relationship)({ ref: "Ad.seller", many: true })
  }
});

// src/api/Image/Image.ts
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var Image = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    file: (0, import_fields6.image)({ storage: "local_images" }),
    ad: (0, import_fields6.relationship)({ ref: "Ad.images" })
  }
});

// schema.ts
var lists = {
  User,
  Category,
  Subcategory,
  Ad,
  Seller,
  Image
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core7.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    server: {
      cors: {
        origin: ["http://localhost:3001"]
      }
    },
    session,
    storage: {
      local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    }
  })
);
