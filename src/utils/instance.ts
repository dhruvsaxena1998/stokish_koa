import Ajv from 'ajv';
import useFormats from 'ajv-formats';
import { logger as Logger } from '@dolanites/utils';

export const ajv = new Ajv({ allErrors: true });
useFormats(ajv);

export const logger = Logger();
