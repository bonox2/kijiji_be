import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import { image, relationship } from '@keystone-6/core/fields';

export const Image = list({
  access: allowAll,
  fields: {
    file: image({ storage: 'local_images' }),
    ad: relationship({ ref: 'Ad.images' })
  }
});
