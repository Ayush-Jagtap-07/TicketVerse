require("dotenv").config();
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');

const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const period = hour >= 12 ? "PM" : "AM";

    // Convert hour to 12-hour format
    const hourIn12 = hour % 12 || 12;  // If hour is 0 (12 AM), show as 12
    const minuteString = minute < 10 ? `0${minute}` : minute;

    return `${hourIn12}:${minuteString} ${period}`;
};

// function generateTicketPDF(ticketDetails, filePath) {
//     return new Promise((resolve, reject) => {
//         try {
//             const doc = new PDFDocument({ margin: 50 });
//             const stream = fs.createWriteStream(filePath);

//             stream.on('finish', () => resolve());
//             stream.on('error', (err) => reject(err));
//             doc.pipe(stream);

//             // Header
//             doc
//                 .fontSize(26)
//                 .fillColor('#007BFF')
//                 .text('TicketVerse - Event Ticket', { align: 'center' })
//                 .moveDown(1.5);

//             // Event Details
//             doc
//                 .fontSize(18)
//                 .fillColor('#000')
//                 .text('Event Details', { underline: true })
//                 .moveDown(0.5);

//             doc.fontSize(14);
//             doc.text(`Event Name: ${ticketDetails.eventName}`);
//             doc.text(`Date: ${ticketDetails.eventDate}`);
//             doc.text(`Time: ${ticketDetails.eventTime}`);
//             doc.text(`Venue: ${ticketDetails.venueName}`);
//             doc.text(`Address: ${ticketDetails.venueAddress}`);
//             if (ticketDetails.organizer)
//                 doc.text(`Organizer: ${ticketDetails.organizer}`);
//             doc.moveDown();

//             // Ticket Info
//             doc
//                 .fontSize(18)
//                 .fillColor('#000')
//                 .text('Ticket Holder', { underline: true })
//                 .moveDown(0.5);

//             doc.fontSize(14);
//             doc.text(`Name: ${ticketDetails.name}`);
//             doc.text(`Email: ${ticketDetails.email}`);
//             doc.text(`Number of Tickets: ${ticketDetails.ticketCount}`);
//             doc.text(`Price per Ticket: ₹${ticketDetails.price}`);
//             doc.text(`Total: ₹${ticketDetails.price * ticketDetails.ticketCount}`);

//             // Footer
//             doc.moveDown(2);
//             doc.fontSize(12).fillColor('gray')
//                .text('Please carry a valid ID proof along with this ticket.', { align: 'center' });
//             doc.text('Thank you for booking with TicketVerse!', { align: 'center' });

//             doc.end();
//         } catch (err) {
//             reject(err);
//         }
//     });
// }

// async function sendTicketEmail(email, name, filePath) {
//     try {
//         console.log("📩 sendTicketEmail called with:", email, filePath);
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.TV_EMAIL,
//                 pass: process.env.TV_PASSWORD,
//             },
//         });

//         await transporter.sendMail({
//             from: `"TicketVerse 🎫" <${process.env.TV_EMAIL}>`,
//             to: email,
//             subject: "🎟️ Your Ticket for the Event is Here!",
//             text: `Hi ${name},\n\nThank you for booking with TicketVerse.\nPlease find your ticket attached as a PDF.\n\nEnjoy the event!\n\n- Team TicketVerse`,
//             html: `
//                 <div style="font-family: Arial, sans-serif; color: #333;">
//                     <h2 style="color: #007BFF;">🎫 TicketVerse - Event Ticket</h2>
//                     <p>Hi <strong>${name}</strong>,</p>
//                     <p>Thank you for booking your ticket with <strong>TicketVerse</strong>.</p>
//                     <p>Please find your ticket attached as a PDF. Show this at the entry.</p>
//                     <hr />
//                     <p style="font-size: 0.9em; color: gray;">This is an automated email. Do not reply.</p>
//                     <p style="font-size: 1em;">🎉 Enjoy the event!<br>— Team TicketVerse</p>
//                 </div>
//             `,
//             attachments: [
//                 {
//                     filename: 'ticket.pdf',
//                     path: filePath,
//                 },
//             ],
//         });


//         console.log("✅ Email sent to", email);
//     } catch (err) {
//         console.error("❌ Email send failed:", err);
//     }
// }

function generateTicketPDF(ticketDetails, filePath, type) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(filePath);

            stream.on('finish', () => resolve());
            stream.on('error', (err) => reject(err));
            doc.pipe(stream);

            // Header
            doc
                .fontSize(26)
                .fillColor('#007BFF')
                .text('TicketVerse - ' + (type === 'movie' ? 'Movie' : 'Event') + ' Ticket', { align: 'center' })
                .moveDown(1.5);

            // Type-specific Details
            if (type === 'event') {
                // Event Details
                doc
                    .fontSize(18)
                    .fillColor('#000')
                    .text('Event Details', { underline: true })
                    .moveDown(0.5);

                doc.fontSize(14);
                doc.text(`Event Name: ${ticketDetails.eventName}`);
                doc.text(`Date: ${ticketDetails.eventDate}`);
                doc.text(`Time: ${ticketDetails.eventTime}`);
                doc.text(`Venue: ${ticketDetails.venueName}`);
                doc.text(`Address: ${ticketDetails.venueAddress}`);
                doc.text(`Total: ₹${ticketDetails.price * ticketDetails.ticketCount}`);
                if (ticketDetails.organizer)
                    doc.text(`Organizer: ${ticketDetails.organizer}`);

            } else if (type === 'movie') {

                // Movie Details
                doc
                    .fontSize(18)
                    .fillColor('#000')
                    .text('Movie Details', { underline: true })
                    .moveDown(0.5);

                doc.fontSize(14);
                doc.text(`Movie Name: ${ticketDetails.movieName}`);
                doc.text(`Showtime: ${ticketDetails.showtime}`);
                doc.text(`Seats: ${ticketDetails.seats.join(', ')}`);
                doc.text(`Venue: ${ticketDetails.venueName}`);
                doc.text(`Address: ${ticketDetails.venueAddress}`);
            }

            doc.moveDown();

            // Ticket Holder Info
            doc
                .fontSize(18)
                .fillColor('#000')
                .text('Ticket Holder', { underline: true })
                .moveDown(0.5);

            doc.fontSize(14);
            doc.text(`Name: ${ticketDetails.name}`);
            doc.text(`Email: ${ticketDetails.email}`);
            doc.text(`Number of Tickets: ${ticketDetails.ticketCount}`);
            doc.text(`Total Price: ₹${ticketDetails.price}`);

            // Footer
            doc.moveDown(2);
            doc.fontSize(12).fillColor('gray')
                .text('Please carry a valid ID proof along with this ticket.', { align: 'center' });
            doc.text('Thank you for booking with TicketVerse!', { align: 'center' });

            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

async function sendTicketEmail(email, name, filePath, type) {
    try {
        console.log("📩 sendTicketEmail called with:", email, filePath);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.TV_EMAIL,
                pass: process.env.TV_PASSWORD,
            },
        });

        let subject, htmlContent;

        if (type === 'event') {
            subject = "🎟️ Your Ticket for the Event is Here!";
            htmlContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #007BFF;">🎫 TicketVerse - Event Ticket</h2>
                    <p>Hi <strong>${name}</strong>,</p>
                    <p>Thank you for booking your ticket for the event with <strong>TicketVerse</strong>.</p>
                    <p>Please find your ticket attached as a PDF. Show this at the event entry.</p>
                    <hr />
                    <p style="font-size: 0.9em; color: gray;">This is an automated email. Do not reply.</p>
                    <p style="font-size: 1em;">🎉 Enjoy the event!<br>— Team TicketVerse</p>
                </div>
            `;
        } else if (type === 'movie') {
            subject = "🎟️ Your Movie Ticket is Here!";
            htmlContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #007BFF;">🎫 TicketVerse - Movie Ticket</h2>
                    <p>Hi <strong>${name}</strong>,</p>
                    <p>Thank you for booking your ticket for the movie with <strong>TicketVerse</strong>.</p>
                    <p>Please find your ticket attached as a PDF. Show this at the movie entry.</p>
                    <hr />
                    <p style="font-size: 0.9em; color: gray;">This is an automated email. Do not reply.</p>
                    <p style="font-size: 1em;">🎉 Enjoy the movie!<br>— Team TicketVerse</p>
                </div>
            `;
        }

        await transporter.sendMail({
            from: `"TicketVerse 🎫" <${process.env.TV_EMAIL}>`,
            to: email,
            subject: subject,
            text: `Hi ${name},\n\nThank you for booking with TicketVerse.\nPlease find your ticket attached as a PDF.\n\nEnjoy the ${type === 'movie' ? 'movie' : 'event'}!\n\n- Team TicketVerse`,
            html: htmlContent,
            attachments: [
                {
                    filename: 'ticket.pdf',
                    path: filePath,
                },
            ],
        });

        console.log("✅ Email sent to", email);
    } catch (err) {
        console.error("❌ Email send failed:", err);
    }
}


module.exports = { convertTo12HourFormat, sendTicketEmail, generateTicketPDF };