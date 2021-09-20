// Validator
import Ajv from "ajv";
import useFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
useFormats(ajv);

// Logger
import { logger as Logger } from "@dolanites/utils";
const logger = Logger();

export { ajv, logger };
