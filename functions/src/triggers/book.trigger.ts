import EmailService from "../helpers/email.helper";

const email = new EmailService();

export const onBookArrival = async (snap: any, context: any) => {
  try {
    const bookArrival = snap.data();
    const sendEmail = await email.sendBulkEmail({
      subject: `New Book Arrival!`,
      html: `
      <div>
        <p>We apperciate you registering for Firestore Bookstore!</p> <br> 
        Here's our new book Arrivals! 
        <ol>
            <li>Name: ${bookArrival.name}</li>
            <li>Author: ${bookArrival.author}</li>
            <li>Price: $ ${bookArrival.price}</li>
        </ol>
        <p>Thank you for your patronage,</p>
        <p>Team Firestore Bookstore</p>
      </div>`,

    })
    return sendEmail
  } catch (error) {
    console.error(error)
    return error
  }
}
