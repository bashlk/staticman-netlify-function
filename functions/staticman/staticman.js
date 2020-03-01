const qs = require('qs');
const UrlPattern = require('url-pattern');
const Staticman = require('staticman/lib/Staticman');

const pattern = new UrlPattern('/.netlify/functions/staticman/:username/:repository/:branch/:property(/)');

exports.handler = (event, context, callback) => {
  const urlParams = pattern.match(event.path);
  const params = {
    ...urlParams,
    // staticman lib has different logic per version. Lock it to 2
    version: '2',
  };

  const staticman = new Staticman(params);
  staticman.setConfigPath();
  staticman.setIp(event.headers['client-ip']);
  staticman.setUserAgent(event.headers['user-agent']);

  const body = qs.parse(event.body);
  const options = body.options || {};

  staticman.processEntry(body.fields, options).then(() => {
    callback(null, {
      statusCode: 200,
      body: 'Success',
    });
  }).catch((error) => {
    callback(error);
  });
};
