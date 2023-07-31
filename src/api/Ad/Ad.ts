

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import { image,text,integer,json,relationship,timestamp } from '@keystone-6/core/fields';

export const Ad = list({
  access: allowAll,
  fields: {
    createdAt: timestamp({ defaultValue: { kind: 'now' },  }),
    title: text(),
    description: text(),
    price: text(),
    coverImg: image({ storage: 'local_images' }),
    views: integer({ defaultValue: 0 }),
    extraData: json({ defaultValue: {} }),

    address: text(),
    seller: relationship({ref: 'Seller.ads'}),
    images: relationship({ref: 'Image.ad', many: true}),
    category: relationship({ref: 'Category.ads'}),
    subcategory: relationship({ref: 'Subcategory.ads'})
  }
});
