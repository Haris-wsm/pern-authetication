const request = require('supertest');
const app = require('../app');
const User = require('../api/v1/users/User');
const SMTPSERVER = require('smtp-server').SMTPServer;

const config = require('config');

const en = require('../../locals/en/translation.json');

let lastMail, server;
let simulateSmtpFailure = false;

beforeAll(async () => {
  server = new SMTPSERVER({
    authOptional: true,
    onData(stream, session, callback) {
      let mailBody;

      stream.on('data', (data) => {
        mailBody += data.toString();
      });

      stream.on('end', () => {
        if (simulateSmtpFailure) {
          const err = new Error('Invalid mailbox');
          err.responseCode = 553;
          return callback(err);
        }
        lastMail = mailBody;
        callback();
      });
    }
  });

  await server.listen(config.mail.port, 'localhost');
});

beforeEach(async () => {
  simulateSmtpFailure = false;
  await User.destroy({ truncate: { cascade: true } });
});

afterAll(async () => {
  await server.close();
});

const postUser = async (body = user) => {
  const response = await request(app).post('/api/v1/users').send(body);

  return response;
};

const user = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'P4ssword'
};

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', async () => {
    const response = await postUser();

    expect(response.status).toBe(200);
  });

  it('returns succes message when signup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe(en.user_create_success);
  });

  it('save user to database', async () => {
    await postUser();

    const users = await User.findAll();

    expect(users.length).toBe(1);
  });

  it('save username and email in database', async () => {
    await postUser();
    const users = await User.findAll({ raw: true });
    const savedUser = users[0];

    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@mail.com');
  });

  it('hashs password in database', async () => {
    await postUser();
    const users = await User.findAll({ raw: true });
    const savedUser = users[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });

  it('retruns 400 when username is null', async () => {
    const response = await postUser({ ...user, username: null });

    expect(response.status).toBe(400);
  });

  it('returns validationErrors field in body when validation error occurs', async () => {
    const response = await postUser({ ...user, username: null });

    const body = response.body;

    expect(body.validationErrors).not.toBeUndefined();
  });

  it.each`
    field         | value             | expectedMessage
    ${'username'} | ${null}           | ${en.username_null}
    ${'username'} | ${'usr'}          | ${en.username_size}
    ${'username'} | ${'a'.repeat(33)} | ${en.username_size}
    ${'password'} | ${null}           | ${en.password_null}
    ${'password'} | ${'P4ssw'}        | ${en.password_size}
    ${'password'} | ${'lowercase'}    | ${en.password_pattern}
    ${'password'} | ${'UPPERCASE'}    | ${en.password_pattern}
    ${'password'} | ${'lowerUPPER'}   | ${en.password_pattern}
    ${'password'} | ${'lower12345'}   | ${en.password_pattern}
    ${'password'} | ${'UPPER12345'}   | ${en.password_pattern}
  `(
    'returns $expectedMessage when $field is $value',
    async ({ field, value, expectedMessage }) => {
      const response = await postUser({ ...user, [field]: value });

      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage);
    }
  );

  it(`returns ${en.email_inuse} when same email already inuse`, async () => {
    await postUser();

    const response = await postUser();

    expect(response.body.validationErrors.email).toBe(en.email_inuse);
  });

  it('creates user inactive mode', async () => {
    await postUser();

    const user = await User.findAll({ raw: true });

    expect(user[0].inactive).toBe(true);
  });

  it('create users inactive mode even request contains inactive is false', async () => {
    await postUser({ ...user, inactive: false });

    const response = await User.findAll({ raw: true });

    expect(response[0].inactive).toBe(true);
  });

  it('create activation token for user', async () => {
    await postUser();
    const response = await User.findAll({ raw: true });

    expect(response[0].activationToken).toBeTruthy();
  });

  it('send an Account activation email with activetionToken', async () => {
    await postUser();
    const users = await User.findAll();
    const savedUser = users[0];
    expect(lastMail).toContain('user1@mail.com');
    expect(lastMail).toContain(savedUser.activationToken);
  });

  it('return 502 Bad gateway when sending email fails', async () => {
    simulateSmtpFailure = true;
    const response = await postUser();
    expect(response.status).toBe(502);
  });

  it('return Email failure message when sending email fails', async () => {
    simulateSmtpFailure = true;
    const response = await postUser();
    expect(response.body.message).toBe('E-mail Failure');
  });

  it('does not save user into database if activation email fails', async () => {
    simulateSmtpFailure = true;
    await postUser();
    const users = await User.findAll();
    expect(users.length).toBe(0);
  });
});

describe('Account activation', () => {
  it('activates the account when correct token is sent', async () => {
    await postUser();
    let users = await User.findAll({ raw: true });
    const token = users[0].activationToken;

    await request(app).post(`/api/v1/users/token/${token}`).send();

    users = await User.findAll();

    expect(users[0].inactive).toBe(false);
  });

  it('removes user token from user table after successful activation', async () => {
    await postUser();
    let users = await User.findAll({ raw: true });
    const token = users[0].activationToken;

    await request(app).post(`/api/v1/users/token/${token}`).send();

    users = await User.findAll();

    expect(users[0].activationToken).toBeFalsy();
  });

  it('does not active account when token is wrong', async () => {
    await postUser();
    const token = 'this-token-does-not-exist';
    await request(app)
      .post('/api/v1/users/token/' + token)
      .send();

    const users = await User.findAll();

    expect(users[0].inactive).toBe(true);
  });

  it('returns Bad Request when token is wrong', async () => {
    await postUser();
    const token = 'this-token-does-not-exist';
    const response = await request(app)
      .post('/api/v1/users/token/' + token)
      .send();

    expect(response.status).toBe(400);
  });

  it.each`
    language | tokenStatus  | message
    ${'en'}  | ${'wrong'}   | ${en.account_activation_failure}
    ${'en'}  | ${'correct'} | ${en.account_activation_success}
  `(
    `return $message when token is $tokenStatus is sent and language is $language`,
    async ({ language, tokenStatus, message }) => {
      await postUser();
      let token = 'this-token-does-not-exist';

      if (tokenStatus === 'correct') {
        const users = await User.findAll();
        token = users[0].activationToken;
      }

      const response = await request(app)
        .post('/api/v1/users/token/' + token)
        .set('accept-language', language)
        .send();

      expect(response.body.message).toBe(message);
    }
  );
});

describe('Error Model', () => {
  it('returns path, timestamp, message and validationErrors in response when validation failure', async () => {
    const response = await postUser({ ...user, username: null });

    const body = response.body;

    expect(Object.keys(body)).toEqual([
      'path',
      'timestamp',
      'message',
      'validationErrors'
    ]);
  });

  it('returns path, timestamp and message when request fails other than validation error', async () => {
    await postUser();
    const token = 'this-token-does-not-exist';

    const response = await request(app)
      .post('/api/v1/users/token/' + token)
      .send();

    expect(Object.keys(response.body)).toEqual([
      'path',
      'timestamp',
      'message'
    ]);
  });
  it('returns path in error body', async () => {
    await postUser();
    const token = 'this-token-does-not-exist';

    const response = await request(app)
      .post('/api/v1/users/token/' + token)
      .send();

    const body = response.body;

    expect(body.path).toEqual('/api/v1/users/token/' + token);
  });
  it('returns timestamp in millisecond within 5 seconds value in error body', async () => {
    const nowInMilli = new Date().getTime();
    const fiveSecondLater = nowInMilli + 5 * 1000;
    await postUser();
    const token = 'this-token-does-not-exist';
    const response = await request(app)
      .post('/api/v1/users/token/' + token)
      .send();
    const body = response.body;

    expect(body.timestamp).toBeGreaterThan(nowInMilli);
    expect(body.timestamp).toBeLessThan(fiveSecondLater);
  });
});
