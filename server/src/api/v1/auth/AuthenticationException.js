module.exports = function AuthenticationException(message) {
  this.status = 400;
  this.message = message || 'authentication_failure';
};
