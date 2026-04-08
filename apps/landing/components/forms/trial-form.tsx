"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { captureEvent } from "@/components/analytics/track-event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DESTINATIONS } from "@/lib/constants";

type FieldErrors = Partial<
  Record<
    "property_name" | "email" | "property_url" | "destination" | "whatsapp_e164",
    string
  >
>;

type TrialFormProps = {
  demoSlug?: string;
};

function destinationLabel(value: string): string {
  return DESTINATIONS.find((d) => d.value === value)?.label ?? value;
}

export function TrialForm({ demoSlug }: TrialFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");
  const [demoUrl, setDemoUrl] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const [propertyName, setPropertyName] = useState("");
  const [destination, setDestination] = useState("bali");

  const previewDestination = useMemo(
    () => destinationLabel(destination),
    [destination]
  );

  function validateStep1(): boolean {
    const next: FieldErrors = {};
    if (!propertyName.trim()) {
      next.property_name = "Property name is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      return;
    }

    setStatus("loading");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const body = {
      property_name: String(fd.get("property_name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      property_url: String(fd.get("property_url") ?? "").trim(),
      destination: String(fd.get("destination") ?? ""),
      whatsapp_e164: String(fd.get("whatsapp_e164") ?? "").trim(),
      website: String(fd.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/trials/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        const errObj = json as {
          error?: { message?: string; details?: { fields?: FieldErrors } };
        };
        const fields = errObj.error?.details?.fields;
        if (fields && typeof fields === "object") {
          const next: FieldErrors = {};
          for (const k of Object.keys(fields) as (keyof FieldErrors)[]) {
            const v = fields[k];
            if (Array.isArray(v) && v[0]) next[k] = v[0];
            else if (typeof v === "string") next[k] = v;
          }
          setErrors(next);
        }
        setMessage(errObj.error?.message ?? "Something went wrong");
        setStatus("error");
        return;
      }

      const ok = json as {
        demo_url?: string;
        subdomain?: string;
      };
      if (ok.demo_url) setDemoUrl(ok.demo_url);
      captureEvent("form_submit", { destination: body.destination });
      setStatus("success");
      setMessage(
        "You’re in. Check your email for confirmation — your demo link is below."
      );
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl border-2 border-accent/35 bg-gradient-to-br from-accent/10 to-background p-8 shadow-lg ring-1 ring-accent/15"
        role="status"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      >
        <motion.div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground text-2xl font-bold shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.05 }}
        >
          ✓
        </motion.div>
        <p className="text-center text-lg font-bold text-foreground">{message}</p>
        {demoUrl ? (
          <p className="mt-4 text-center text-sm text-muted">
            Demo:{" "}
            <a href={demoUrl} className="font-semibold text-accent underline">
              {demoUrl}
            </a>
          </p>
        ) : null}
        {demoSlug ? (
          <p className="mt-4 text-center text-sm text-muted">
            Preview:{" "}
            <a
              href={`/demo/${demoSlug}`}
              className="font-semibold text-accent underline"
            >
              Open full-screen demo
            </a>
          </p>
        ) : null}
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-lg ring-1 ring-accent/10 sm:p-8"
      noValidate
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.07] via-transparent to-transparent"
        aria-hidden
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            Step {step} of 2
          </p>
          <div className="h-1.5 flex-1 max-w-[200px] rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={false}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        <input type="hidden" name="property_name" value={propertyName} />

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.28 }}
              className="space-y-5"
            >
              <Input
                label="Villa / property name"
                id="trial-property-name"
                required
                autoComplete="organization"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                error={errors.property_name}
              />
              <div className="space-y-1.5">
                <span className="block text-sm font-semibold text-foreground">
                  Destination
                </span>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground shadow-sm transition-shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/35 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Continue
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28 }}
              className="space-y-5"
            >
              <div className="rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-foreground">
                <p className="font-semibold">Nice — we’ll prioritize direct bookings for</p>
                <p className="mt-1 text-muted">
                  <span className="font-bold text-foreground">{propertyName}</span>{" "}
                  in <span className="font-bold text-foreground">{previewDestination}</span>.
                </p>
              </div>
              <Input
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <Input
                label="Current property URL (optional)"
                name="property_url"
                type="url"
                placeholder="https://"
                autoComplete="url"
                error={errors.property_url}
              />
              <Select
                label="Destination"
                name="destination"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                options={DESTINATIONS.map((d) => ({
                  value: d.value,
                  label: d.label,
                }))}
                error={errors.destination}
              />
              <Input
                label="WhatsApp (optional, E.164)"
                name="whatsapp_e164"
                placeholder="+6281234567890"
                autoComplete="tel"
                error={errors.whatsapp_e164}
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setStep(1);
                    setErrors({});
                    setMessage("");
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full flex-1"
                  size="lg"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? "Launching…"
                    : "Launch my direct booking channel"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status === "error" && message ? (
          <p className="relative mt-4 text-sm text-red-600" role="alert">
            {message}
          </p>
        ) : null}
        <p className="relative mt-4 text-xs text-muted leading-relaxed">
          By submitting, you agree to our{" "}
          <a href="/terms" className="font-semibold text-accent hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="font-semibold text-accent hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
