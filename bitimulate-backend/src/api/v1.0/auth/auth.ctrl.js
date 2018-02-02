const Joi = require('joi');
const User = require('db/models/User');
const token = require('lib/token');

exports.localRegister = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    displayName: Joi.string().regex(/^[a-zA-Z0-9]{3,12}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30),
  });

  const result = Joi.validate(body, schema);

  // Schema Error
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { displayName, email, password } = body;
  try {

    const exists = await User.findExistancy({email, displayName});
    if(exists) {
      ctx.status = 409;
      const key = exists.email === email ? 'email' : 'displayName';
      ctx.body = {
        key: key
      };
      return;
    }

    const user = await User.localRegister({
      displayName, email, password
    });

    ctx.body = {
      displayName,
      _id: user._id,
      metaInfo: user.metaInfo
    };

    const accessToken = await user.generateToken();
    // configure accessToken to httpOnly cookie
    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

  } catch(e) {
    ctx.throw(500);
  }
}

exports.localLogin = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30),
  });

  const result = Joi.validate(body, schema);

  if(result.error) {
    ctx.status = 400;
    return;
  }

  const {email, password} = body;

  try {
    const user = await User.findByEmail(email);

    if(!user) {
      ctx.status = 403;
      return;
    }

    const validated = user.validatePassword(password);
    if(!validated) {
      ctx.status = 403;
      return;
    }

    const accessToken = await user.generateToken();

    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    const { displayName, _id, metaInfo } = user;
    ctx.body = {
      displayName,
      _id,
      metaInfo
    };

  } catch(e) {
    ctx.throw(500);
  }

}

exports.check = async (ctx) => {
  const { user } = ctx.request;

  if(!user) {
    ctx.status = 401;
    return;
  }

  try {
    const exists = await User.findById(user._id);
    if(!exists) {
      // invalid user
      ctx.cookies.set('access_token', null, {
        maxAge: 0,
        httpOnly: true
      });
      ctx.status = 401;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    user
  };
};
