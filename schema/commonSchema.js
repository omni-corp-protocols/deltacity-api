const Joi = require('@hapi/joi');

const createUserSchema = Joi.object({

    userName: Joi.string().min(3).max(40),
    userPassword: Joi.string(),
    address: [ Joi.string(), Joi.number() ],
    emailAddress: Joi.string().required(),
    userRoleBank: Joi.boolean(),
    userRoleCustodian: Joi.boolean(),
    userRoleAdmin: Joi.boolean(),
    userRoleManager: Joi.boolean(),
    userRoleInvestor: Joi.boolean(),
    profilePicture: Joi.string(),
    contactNumber: Joi.number().required(),
    registrationNumber: Joi.string(),
    domicileForTaxPurpose: Joi.string(),
    country: Joi.string(),
    twoFAEnabled: Joi.boolean(),
    SMSVerified: Joi.boolean(),
    KYCStatus: Joi.boolean(),
    userActive: Joi.boolean(),
    emailVerified: Joi.number(),
    eVerifyKey: Joi.string(),
    forgetPassKey: Joi.string(),
    forgetPassVerified: Joi.number(),
    twoFASecretKey: Joi.string(),
    twoFArecoveryKey: Joi.string(),
    investorType: Joi.string(),
    investorAssetsSize: Joi.number()
});

const updateUserSchema = Joi.object({
    userName: Joi.string().min(3).max(40).required(),
    contactNumber: Joi.number().required(),
    dialingCode: Joi.number().required(),
    country: Joi.string().required(),
    address: [ Joi.string(), Joi.number(),Joi.required() ],
    investorType: Joi.string(),
    registrationNumber: Joi.string(),
    domicileForTaxPurpose: Joi.string(),
    investorAssetsSize: Joi.number(),
    profilePicture: Joi.string(),
    kycStatus: Joi.number().required(),
});

module.exports = {
    createUserSchema,
    updateUserSchema 
};