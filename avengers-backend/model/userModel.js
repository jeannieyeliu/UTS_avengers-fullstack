const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const sgMail = require("@sendgrid/mail");
const hdb = require("handlebars");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const template = fs.readFileSync(
  "views/verificationEmail.handlebars", 
  "utf-8"
);
const compiledTemplate = hdb.compile(template);

const forgetEmailTemplate = fs.readFileSync(
  "views/forgetPasswordEmail.handlebars",
  "utf-8"
);
const forgetEmailCompiledTemplate = hdb.compile(forgetEmailTemplate);

const userSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    minlength: 5,
    maxlength: 32 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 32
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6, 
    maxlength: 255 
  },
  is_active: {
    type: Boolean,
    default: false
  },
  avatar_url: { 
    type: String 
  },
  gender: {
    type: String,
    enum: ["", "male", "female"],
    default: ""
  },
  headline: { 
    type: String 
  },
  locations: { 
    type: [{ type: String }] 
  },
  business: { 
    type: String 
  }
});

userSchema.methods.generateUserJwtToken = function() {
  const jwtToken = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email
    },
    config.key,
    {
      expiresIn: config.user_token_expireTime
    }
  );
  return jwtToken;
};

userSchema.methods.generateEmailJwtToken = function() {
  const jwtToken = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email
    },
    config.key,
    {
      expiresIn: config.email_token_expireTime
    }
  );
  return jwtToken;
};

userSchema.methods.sendVerificationEmail = function(jwtToken) {
  sgMail.setApiKey(config.sendgrid_api_key);
  const msg = {
    to: this.email,
    from: config.email_from,
    subject: config.email_subject,
    html: compiledTemplate({
      userId: this._id,
      username: this.username,
      token: jwtToken
    })
  };
  sgMail.send(msg);
};

userSchema.methods.sendForgetPasswordEmail = function(jwtToken) {
  sgMail.setApiKey(config.sendgrid_api_key);
  const msg = {
    to: this.email,
    from: config.email_from,
    subject: config.forget_email_subject,
    html: forgetEmailCompiledTemplate({
      userId: this._id,
      username: this.username,
      token: jwtToken
    })
  };
  sgMail.send(msg);
};

function validateRegisterUser(data) {
  const schema = {
    username: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(6) //minimum characters
      .max(255) //maximum characters
      .required()
  };
  return Joi.validate(data, schema);
}

function validateLoginUser(data) {
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string().required()
  };
  return Joi.validate(data, schema);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validateRegisterUser, validateLoginUser };
