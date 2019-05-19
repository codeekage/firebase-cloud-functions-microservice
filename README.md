# firebase-cloud-functions-microservice
Microservice designed with Firebase Cloud Functions and Firestore

## Setups

### Installations

Ensure you have the following installed before running `npm install`
- Node.js
- NPM
- Firebase Tools

## API_KEY 
 
 Obtain **Application API_KEY** from Firebase and replace with the string in `src/helpers/firebase.helper.ts`

## Upgrade Firebase Account
You'd want to upgrade your Firebase Project from the Free Tier to Blaze. Without the upgrade the application will resolve to a _netwowrk outofbound ERROR_

## Testing Application 
- Run `npm run deploy` to Deploy or `npm run serve` to test the Cloud Functions 
> NB: If the emulator fails to run please ensure you are running  `firebase-tools 6.9.3`

## Setup Twilio SendGrid

To send emails when a new book is added to your users
- Create a Twilio SendGrid Account https://sendgrid.com
- Obtain API_KEY 
- Replace the 
