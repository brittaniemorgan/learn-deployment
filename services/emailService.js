const nodemailer = require('nodemailer');
const API_URL = 'http://localhost:3000/v1';
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendEmail(to, subject, html) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }
  sendPurchaseEmail(data) {
    fetch(`${API_URL}/events/${data.eventId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Event not found or could not fetch event details');
        }
        return response.json();
      })
      .then(event => {
        return fetch(`${API_URL}/tickets/${data.ticketId}`).then(ticketResponse => {
          if (!ticketResponse.ok) {
            throw new Error('QR code not found or could not fetch QR code');
          }
          return ticketResponse.json().then(ticket => ({ event, ticket }));
        });
      })
      .then(({ event, ticket }) => {
        const subject = `Ticket Purchased: ${event.title}`;
        const html = `
          <h1>You have purchased ${data.quantity} ticket(s) for ${event.title}</h1>
          <p>Date: ${new Date(event.date).toLocaleString()}</p>
          <p>Location: ${event.location}</p>
          <p>Details: ${event.description}</p>
          <img src="${ticket.qrCode}" alt="QR Code" />
        `;
        return this.sendEmail(data.email, subject, html);
      })
      .then(() => {
        console.log('Purchase email sent successfully.');
      })
      .catch(error => {
        console.error('Error sending purchase email:', error);
        throw error; 
      });
  }
  

  sendEventUpdateEmails(event, data) {
    fetch(`${API_URL}/purchased-tickets?eventId=${event.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch ticket purchases');
        }
        return response.json();
      })
      .then(tickets => {
        const recipients = tickets.map(ticket => ticket.email);
        const subject = `Event Update: ${data.title}`;
        const html = `
          <h1>Update on Event: ${event.title}</h1>
          <p>Status: ${event.status}</p>
          <p>New Date: ${event.date ? new Date(event.date).toLocaleString() : 'N/A'}</p>
          <p>Location: ${event.location}</p>
          <p>Details: ${event.description}</p>
        `;
  
        const sendPromises = recipients.map(email => this.sendEmail(email, subject, html));
        return Promise.all(sendPromises);
      })
      .then(() => {
        console.log('Event update emails sent successfully to all ticket holders.');
      })
      .catch(error => {
        console.error('Error sending event update emails:', error);
        throw error; 
      });
    }
}

module.exports = new EmailService();
