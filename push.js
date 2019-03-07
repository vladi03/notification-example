const webPush = require('web-push');
process.env.VAPID_PUBLIC_KEY = 'BEiqkgmYTXF3qjnzLXH3k0C2NqMr-HPmRZtQNHO7b17SsP4zmVkDb1ZNR3iUW5Eh9tCFkgJ95r23jcg-HoQN7Q8';
process.env.VAPID_PRIVATE_KEY = 'bcDvmO4ImuL0chYh24com0DA-sA46G1ev-3BC-hsEcc';
if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY "+
    "environment variables. You can use the following ones:");
  console.log(webPush.generateVAPIDKeys());
  return;
}

const subscriptions =[];

//Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  'BCD Travel',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

module.exports = function(app, route) {
  app.get(route + 'vapidPublicKey', function(req, res) {
    res.send(process.env.VAPID_PUBLIC_KEY);
  });

  app.post(route + 'register', function(req, res) {
      const subscription = req.body.subscription;
      subscriptions.push(subscription);
      //A real world application would store the subscription info.
      res.sendStatus(201);
  });

  app.post(route + 'sendNotification', function(req, res) {
    const subscription = req.body.subscription;
    const payload = null;
    const options = {
      TTL: req.body.ttl
    };

    setTimeout(function() {
      webPush.sendNotification(subscription, payload, options)
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(error) {
        res.sendStatus(500);
        console.log(error);
      });
    }, req.body.delay * 1000);
  });
};