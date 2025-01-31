const Action = require('./models/Action');

const disallowedValues = [
  '[not provided]',
  'placeholder',
  '[[unknown]]',
  'not set',
  'not provided',
  'unknown',
  'undefined',
  'n/a',
];

const filterNullValuesFromObject = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(
      ([_, v]) =>
        v !== null &&
        v !== '' &&
        typeof v !== 'undefined' &&
        (typeof v !== 'string' ||
          !disallowedValues.includes(v.toLowerCase()) ||
          !v.toLowerCase().includes('!$record'))
    )
  );

const normalizePropertyName = (key) =>
  key
    .toLowerCase()
    .replace(/__c$/, '')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');

const goal = async (actions) => {
  await Promise.all(
    actions.map(async (action) => {
      try {
        const newAction = new Action(action);
        await newAction.save();
      } catch (error) {
        console.log('Error saving action:', error.message);
        console.log('Action:', action);
      }
    })
  );
};

module.exports = {
  filterNullValuesFromObject,
  normalizePropertyName,
  goal,
};
