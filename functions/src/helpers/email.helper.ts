import * as sgMail from '@sendgrid/mail'
import * as admin from 'firebase-admin'
import {SG_APIKEY as API_KEY} from '../keys'
admin.initializeApp();

interface Email {
    subject : string,
    html : string
}

export default class EmailService {
  constructor(){
    sgMail.setApiKey(API_KEY)
  }
  async sendEmail(uid : string, message : Email) {
    try {
      const user = await admin.auth().getUser(uid)
      if (user) {
        const { email } = user
        if(!email){return Promise.reject('Email undefined!')}
        //sgMail.setApiKey(API_KEY)
        const msg = {
          to: email,
          from: 'noreply@us-central1-fire-bookstore.cloudfunctions.net',
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

   async sendBulkEmail(message: Email){
    try {
      let state;
      const userList = await admin.auth().listUsers()
      userList.users.forEach(async user => {
        const msg = {
          to: user.email,
          from: 'noreply@us-central1-fire-bookstore.cloudfunctions.net',
          subject: message.subject,
          html: message.html
        }
        const sent = await sgMail.send(msg)
        if (sent) {
          console.log(sent)
            state = sent
        }
        state = 'Failed to send'
      })
      return state
    }catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async listAllUsers(nextPageToken? : any){
    try {
    const emails = new Array()
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken)
      listUsersResult.users.forEach(async user => {
       await emails.push(user.email)
      })
      if(listUsersResult.pageToken){
       await this.listAllUsers(listUsersResult.pageToken)
      }
      return emails
    } catch (error) {
      return error
    }
  }
   
  
}
