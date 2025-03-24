// JavaScript (Node.js mit Express und Nodemailer)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validierung
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'Alle Felder müssen ausgefüllt werden.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' });
    }

    // E-Mail-Konfiguration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ba.f.prosoft@gmail.com', 
        }
    });

    let mailOptions = {
        from: `${name} <${email}>`,
        to: 'ba.f.prosoft@gmail.com',
        subject: `Kontaktformular: ${subject}`,
        html: `<h2>Neue Kontaktanfrage</h2>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>E-Mail:</strong> ${email}</p>
               <p><strong>Betreff:</strong> ${subject}</p>
               <p><strong>Nachricht:</strong> ${message.replace(/\n/g, '<br>')}</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später noch einmal.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
