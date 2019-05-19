# firebase-cloud-functions-microservice
Microservice designed with Firebase Cloud Functions and Firestore

## Setups

### Installations

Ensure you have the following installed before running `npm install`
- Node.js
- NPM
- Firebase Tools

## API_KEY 
 
 Obtain **Application API_KEY** from Firebase Configs and create `keys.ts` in the root directory of the `functions` folder
 
 ```javascript 
 
 export const firebaseConfig = {
    apiKey: "AXXXXXXXXXXXXXXXXXXXXXXXQ",
    authDomain: "<APP_NAME>.firebaseapp.com",
    databaseURL: "https://<APP_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<APP_NAME>.appspot.com",
    messagingSenderId: "XXXXXXXXXX",
    appId: "XXXXXXXXXXXXXXXXXXXXXXXXX"
}
 
 ```

## Upgrade Firebase Account
You'd want to upgrade your Firebase Project from the Free Tier to Blaze. Without the upgrade the application will resolve to a _netwowrk outofbound ERROR_

## Testing Application 
- Run `npm run deploy` to Deploy or `npm run serve` to test the Cloud Functions 
> NB: If the emulator fails to run please ensure you are running  `firebase-tools 6.9.3`

## Setup Twilio SendGrid

To send emails when a new book is added to your users
- Create a Twilio SendGrid Account https://sendgrid.com
- Obtain API_KEY from `sendgrid`
- Update `keys.ts` in the root directory of the `functions` folder 

```javascript
......

export const SG_APIKEY  = 'SG.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

````

## Existing Functionalities

#### Routes 
- **auth** `/auth`
 - [POST] `/login` - Assigns User-Token for `firebase security rules`
 - [POST] `/signup` - Creates a new user
 - [GET] `/logout` - Remove User-Token 
 
- **user** `/user`
  - [GET] `/profile` - Retrives currently logged-in user's profile
  - [PUT] `/update` - Update Currently logged in user's profile
 
 -**book** `/book`
 - [POST] `/add` - Add a new book to Firestore
  - [GET] `/fetch` - Retrives all books from Firestors
  - [GET] `/fetch/:id` - Retrive book with the `id` of `req.params.id`
  - [PUT] `/update/:id`-  Update book with the `id` of `req.params.id`
  - [DELETE] `/remove/:id` - Delete book with the `id` of `req.params.id`
 
 #### Triggers 
 
- **onCreateUser** - Trigged when a user signsup and sends email using SendGrid 
- **onBookArrival** Trigged when a new book is created and sends email using SendGrid 


### Custom 

- sendVerifcationEmail - When user signsup. 





