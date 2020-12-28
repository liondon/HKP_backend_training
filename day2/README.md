## Getting Started
1. `git clone` this repo
2. `cd HKP_backend_training/day2`
3. open `localhost:3000` in the browser
4. go to `/${whateverpath}` and check the path and other details (query string, host, etc.) of the `request` showed in console
5. go to `/?year=${2020}&month=${May}` and check the year/month showed in browser and console
6. go to `/?text=${UserDefinedContent}` and check the content showed in browser
7. run `node event.js` and check the result logged in the console
8. upload a file use the form and check the file save in the `temp` directory
9. modify the email address and password in `mailer.js` and run `node mailer.js` to sent mail (you may also need to turn on your google account setting to allow access from less secure apps)
