export type CareerEnquiry = {
  name: string;
  email: string;
  stage: string;
  targetRole: string;
  challenge: string;
  deadline: string;
};

const STAGES = new Set(["student", "graduate", "early-career", "other"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function parseCareerEnquiry(value: unknown):
  | { ok: true; enquiry: CareerEnquiry }
  | { ok: false; error: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { ok: false, error: "Please complete the enquiry form." };
  const fields = value as Record<string, unknown>;
  const text = (key: string) => typeof fields[key] === "string" ? fields[key].trim() : "";
  const enquiry: CareerEnquiry = {
    name: text("name"), email: text("email").toLowerCase(), stage: text("stage"),
    targetRole: text("targetRole"), challenge: text("challenge"), deadline: text("deadline"),
  };
  if (!enquiry.name || enquiry.name.length > 100 || /[\r\n]/.test(enquiry.name)) return { ok: false, error: "Please enter your name (up to 100 characters)." };
  if (!EMAIL.test(enquiry.email) || enquiry.email.length > 254) return { ok: false, error: "Please enter a valid email address." };
  if (!STAGES.has(enquiry.stage)) return { ok: false, error: "Please select your current stage." };
  if (!enquiry.targetRole || enquiry.targetRole.length > 500) return { ok: false, error: "Please describe your target role in up to 500 characters." };
  if (enquiry.challenge.length < 10 || enquiry.challenge.length > 2000) return { ok: false, error: "Please describe what you need help with in 10 to 2,000 characters." };
  if (enquiry.deadline && (!/^\d{4}-\d{2}-\d{2}$/.test(enquiry.deadline) || !Number.isFinite(Date.parse(enquiry.deadline)) || new Date(enquiry.deadline).toISOString().slice(0, 10) !== enquiry.deadline)) return { ok: false, error: "Please enter a valid application or interview date, or leave it blank." };
  return { ok: true, enquiry };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function careerEnquiryHtml(enquiry: CareerEnquiry): string {
  const labels: [string, string][] = [
    ["Name", enquiry.name], ["Email", enquiry.email], ["Stage", enquiry.stage],
    ["Target role", enquiry.targetRole], ["Preparation needs", enquiry.challenge],
    ["Application or interview date", enquiry.deadline || "Not provided"],
  ];
  return `<h1 style="font-size:24px;">Career preparation enquiry</h1>${labels.map(([label, value]) => `<h2 style="margin:24px 0 6px;font-size:16px;">${label}</h2><p style="margin:0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(value)}</p>`).join("")}<p style="margin-top:28px;"><a href="mailto:${encodeURIComponent(enquiry.email)}?subject=Your%20career%20preparation%20enquiry">Reply to this enquiry</a></p><p style="font-size:13px;">Submitted through the career preparation form. This is an enquiry, not a booking or newsletter subscription.</p>`;
}
