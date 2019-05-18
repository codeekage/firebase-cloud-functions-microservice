import * as sgMail from '@sendgrid/mail'
import * as admin from 'firebase-admin'
admin.initializeApp();
const API_KEY =
  'SG.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

interface Email {
    subject : string,
    html : string
}

export default class EmailService {
  sendEmail = async (uid : string, message : Email) => {
    try {
      const user = await admin.auth().getUser(uid)
      if (user) {
        const { email } = user
        if(!email){return Promise.reject('Email undefined!')}
        sgMail.setApiKey(API_KEY)
        const msg = {
          to: email,
          from: 'noreply@fire-bookstore.firebaseapp.com',
          subject: message.subject,
          html: message.html
        }
        const sent = await sgMail.send(msg)
        if (sent) {
          console.log(sent)
            return sent
        }
        return 'Failed to send'
      }
      return Promise.reject('Unable to send because User might not exist!')
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }
  
}
