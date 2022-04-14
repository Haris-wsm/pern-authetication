module.exports = function ValidationException(errors) {
  this.status = 400;
  this.message = 'Validation failure';
  this.errors = errors;
};
