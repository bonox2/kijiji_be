import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import { text, relationship } from '@keystone-6/core/fields';

export const Subcategory = list({
  access: allowAll,
  fields: {
    name: text(),
    category: relationship({ref: 'Category.subcategories'}),
    ads: relationship({ref: 'Ad.subcategory', many: true})
  }
});
