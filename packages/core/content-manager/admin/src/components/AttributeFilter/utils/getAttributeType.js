import get from 'lodash/get';

const getAttributeType = (attributeName, contentType, metaData) => {
  const attributeType = get(contentType, ['attributes', attributeName, 'type'], '');

  if (attributeType === 'relation') {
    return get(metaData, [attributeName, 'list', 'mainField', 'schema', 'type'], 'string');
  }

  return attributeType;
};

export default getAttributeType;
