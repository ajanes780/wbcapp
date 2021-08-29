import { Helmet } from 'react-helmet';

import React from 'react';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='Keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Wildboys Campouts',
  Keywords: 'Campouts, camping, motorcycles , harley',
  description: 'We do campouts',
};

export default Meta;
