import EmailService from "../helpers/email.helper";

const email = new EmailService();

export const onCreate = async (user: any) => {
  try {
    const { uid  } = user
    const sendEmail = await email.sendEmail(uid, {
      subject: `Welcome to Firstore Bookstore!`,
      html: `<p>We apperciate you registering for Firestore Bookstore!</p>`,
    })
    return sendEmail
  } catch (error) {
    console.error(error)
    return error
  }
}
