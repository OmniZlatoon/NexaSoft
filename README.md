# NexaSoft

# install the following Packages
- `npm `:

* redis
* nodemailer

* For the .env variables
* 1) Nodemailer Connection 
* create ` app password ` in the --- google center ---  to use to connect to the Nodemailer module, to be able to send the email
* [ browse on how to create google app password, and follow all steps that would be provided ]
  e.g.,
  APP_PASSWORD= trye d8wj uwie 9ow0
  APP_EMAIL= ruletrek@gmail.com


  2) Redis Connection
  * create a redis account in the `https://console.upstash.com` platform
  * create a DB , and copy your redis API endpoint to use in the redis connection script
  * e.g.,
  * REDIS_URI=rediss://default:ATavAAIncDI4YzU1ZmVyrhdBN2U0MDBhOGM4MDdkMmMzYWM5MDFiNnAyMTM5OTk@flexible-escargot-13999.upstash.io:6379
 
  * Note: you can read the redis documentation inside the platform how to connect, using different methods
 
- With that, your connection would be easy to go
- 
