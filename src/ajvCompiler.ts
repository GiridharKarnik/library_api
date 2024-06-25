import Ajv from 'ajv';
import { AnySchemaObject } from 'ajv/lib/types';

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
});

export const customCompiler = ({ schema }: { schema: AnySchemaObject }) => {
  return ajv.compile(schema);
};
