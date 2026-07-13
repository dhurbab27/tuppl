import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await contactSchema.validate(body, { abortEarly: false });

    await prisma.contactMessage.create({
      data: {
        name: String(body.name).trim(),
        phone: String(body.phone).trim(),
        email: String(body.email).trim().toLowerCase(),
        message: String(body.message).trim(),
      },
    }).then(async (message) => {
      void sendMail({
        to: process.env.CONTACT_TO || "info@tuppl.com",
        subject: `Contact form from ${message.name}`,
        text: `Name: ${message.name}\nPhone: ${message.phone}\nEmail: ${message.email}\n\n${message.message}`,
      });
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to send message" },
      { status: 400 },
    );
  }
}
