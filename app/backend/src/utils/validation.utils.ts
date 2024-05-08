import { ValidationChain } from "express-validator";

//Const to return if an input is a string and is not empty
export const nonEmptyString = (
  validationObject: ValidationChain
): ValidationChain => {
  return validationObject.isString().not().isEmpty();
};
