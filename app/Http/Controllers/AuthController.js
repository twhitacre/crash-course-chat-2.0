'use strict'

const User = use('App/Model/User')

class AuthController {

  * login (request, response) {
    yield response.sendView('auth/login', { url: request.googleURL });
  }

  * logout (request, response) {
    yield request.auth.logout()
    return response.redirect('/');
  }

  * callback (request, response) {

    const profile = request.googleProfile;

    // Are they logged in & is it a TIY Email
    if (profile && this.validateTIY(profile)) {

      let user = yield this.createUser(profile);
      yield request.auth.login(user)

      response.redirect('/');

    } else { response.redirect('/errors/employee'); }
  }

  validateTIY (profile) {
    return profile.domain === 'theironyard.com';
  }

  createUser (profile) {
    let user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      authProvider: 'Google',
      googleId: profile.id
    }

    return User.findOrCreate({ 'googleId': profile.id }, user);
  }

}

module.exports = AuthController
