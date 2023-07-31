import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import { text, relationship } from '@keystone-6/core/fields';

export const Category = list({
  access: allowAll,
  fields: {
    name: text(),
    subcategories: relationship({ref: 'Subcategory.category', many: true}),
    ads:  relationship({ref: 'Ad.category', many: true})
  }
});
