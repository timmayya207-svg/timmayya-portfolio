import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create transporter
    // Using Gmail SMTP - you'll need to set up an App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "timmayya207@gmail.com",
        pass: process.env.EMAIL_PASSWORD, // Gmail App Password
      },
    });

    // Email content
    const mailOptions = {
      from: `"Timmayya Design Portfolio" <${process.env.EMAIL_USER || "timmayya207@gmail.com"}>`,
      to: "timmayya207@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border: 1px solid #d4af37; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px;">New Message from Portfolio</h1>
            <p style="color: #888; margin-top: 10px;">Someone wants to connect with you!</p>
          </div>
          
          <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #d4af37; margin-top: 0; font-size: 18px;">Contact Details</h2>
            <p style="color: #fff; margin: 10px 0;"><strong style="color: #d4af37;">Name:</strong> ${name}</p>
            <p style="color: #fff; margin: 10px 0;"><strong style="color: #d4af37;">Email:</strong> <a href="mailto:${email}" style="color: #fff; text-decoration: underline;">${email}</a></p>
          </div>
          
          <div style="background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 8px; padding: 20px;">
            <h2 style="color: #d4af37; margin-top: 0; font-size: 18px;">Message</h2>
            <p style="color: #fff; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
            <p style="color: #666; font-size: 12px;">This message was sent from your portfolio website contact form.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio website contact form.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
