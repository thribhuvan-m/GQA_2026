import { hasErrors, validateContact } from "@/lib/validation";

type Body = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };

/**
 * Forwards contact messages to CONTACT_FORM_ENDPOINT (e.g. a Formspree,
 * Basin or custom webhook URL that accepts JSON). Without it, the route
 * reports that messaging is not configured instead of pretending to send.
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ status: "invalid", errors: { message: "Invalid request." } }, { status: 400 });
  }

  // Honeypot field: real visitors never fill it.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ status: "invalid", errors: {} }, { status: 400 });
  }

  const input = {
    name: typeof body.name === "string" ? body.name : "",
    email: typeof body.email === "string" ? body.email : "",
    message: typeof body.message === "string" ? body.message : "",
  };
  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return Response.json({ status: "invalid", errors }, { status: 422 });
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    return Response.json({ status: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: input.name.trim(),
        email: input.email.trim(),
        message: input.message.trim(),
        source: "thrive.in contact form",
      }),
    });
    if (!res.ok) return Response.json({ status: "error" }, { status: 502 });
    return Response.json({ status: "sent" });
  } catch {
    return Response.json({ status: "error" }, { status: 502 });
  }
}
