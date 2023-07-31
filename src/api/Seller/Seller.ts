import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { image, text, json, relationship } from '@keystone-6/core/fields';

export const Seller = list({
  access: allowAll,
  fields: {
    firstName: text(),
    lastName: text(),
    avatar: image({ storage: 'local_images' }),
    phoneNumber: text(),
    ratings: json({ defaultValue: {} }),

    user: relationship({ ref: 'User.seller' }),
    ads: relationship({ ref: 'Ad.seller', many: true })
  }
});
