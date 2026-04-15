import { NextRequest, NextResponse } from "next/server";

// Using Web3Forms - Free email service without SMTP setup
// Get your access key from: https://web3forms.com

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

    // Use Web3Forms to send email (free, no SMTP setup needed)
    // Access key for timmayya207@gmail.com - get from web3forms.com
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "your-access-key";

    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("subject", `New Contact Form Submission from ${name}`);
    formData.append("to", "timmayya207@gmail.com");
    formData.append("from_name", "Timmayya Portfolio");
    formData.append("replyto", email);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    } else {
      console.error("Web3Forms error:", result);
      return NextResponse.json(
        { success: false, error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
