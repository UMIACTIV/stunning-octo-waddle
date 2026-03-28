const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
const UTM_COOKIE = "umi_utm";
const UTM_TTL_DAYS = 30;

export function captureUtmParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const utmData: Record<string, string> = {};

  let hasUtm = false;
  for (const key of UTM_PARAMS) {
    const val = params.get(key);
    if (val) {
      utmData[key] = val;
      hasUtm = true;
    }
  }

  if (!hasUtm) return;

  utmData.landing_page = window.location.pathname;
  utmData.timestamp = new Date().toISOString();

  const expires = new Date();
  expires.setDate(expires.getDate() + UTM_TTL_DAYS);
  document.cookie = `${UTM_COOKIE}=${encodeURIComponent(JSON.stringify(utmData))};path=/;expires=${expires.toUTCString()};SameSite=Lax`;
}

export function getUtmParams(): Record<string, string> | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${UTM_COOKIE}=`));

  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return null;
  }
}
