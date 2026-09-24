import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { decryptExecutionKit, verifyDownloadToken } from "@/lib/execution-kit-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const accessSecret = process.env.EXECUTION_KIT_ACCESS_SECRET;
  const encryptionKey = process.env.EXECUTION_KIT_FILE_KEY;
  const token = new URL(request.url).searchParams.get("token");

  if (!accessSecret || !encryptionKey) {
    console.error("execution kit download: missing required environment variables");
    return new Response("Download is temporarily unavailable.", { status: 500 });
  }
  if (!token || !verifyDownloadToken(token, accessSecret)) {
    return new Response("This download link is invalid or has expired.", { status: 403 });
  }

  try {
    const encrypted = await readFile(
      join(process.cwd(), "private-assets", "execution-kit-v1.enc")
    );
    const zip = decryptExecutionKit(encrypted, encryptionKey);
    return new Response(new Uint8Array(zip), {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        "Content-Disposition":
          'attachment; filename="AI-Product-Launch-Execution-Kit-v1.0.zip"',
        "Content-Length": String(zip.length),
        "Content-Type": "application/zip",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("execution kit download: could not decrypt file", error);
    return new Response("Download is temporarily unavailable.", { status: 500 });
  }
}
