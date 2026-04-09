"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { captureEvent } from "@/components/analytics/track-event";
import { useLocaleContext } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DESTINATIONS } from "@/lib/constants";
import { localizedPath } from "@/lib/i18n/paths";

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
  const { locale, messages } = useLocaleContext();
  const tf = messages.trialForm;
  const termsHref = localizedPath(locale, "/terms");
  const privacyHref = localizedPath(locale, "/privacy");

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

  const summaryLine2 = useMemo(
    () =>
      tf.summarySecondLine
        .replace("{name}", propertyName)
        .replace("{dest}", previewDestination),
    [tf.summarySecondLine, propertyName, previewDestination]
  );

  function validateStep1(): boolean {
    const next: FieldErrors = {};
    if (!propertyName.trim()) {
      next.property_name = tf.propertyNameRequired;
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
        setMessage(errObj.error?.message ?? tf.genericError);
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
      setMessage(tf.successTitle);
      router.refresh();
    } catch {
      setStatus("error");
      setMessage(tf.networkError);
    }
  }

  const demoPreviewHref = demoSlug
    ? localizedPath(locale, `/demo/${demoSlug}`)
    : null;

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
            {tf.demoLabel}{" "}
            <a href={demoUrl} className="font-semibold text-accent underline">
              {demoUrl}
            </a>
          </p>
        ) : null}
        {demoPreviewHref ? (
          <p className="mt-4 text-center text-sm text-muted">
            {tf.previewLabel}{" "}
            <a
              href={demoPreviewHref}
              className="font-semibold text-accent underline"
            >
              {tf.openDemo}
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
            {tf.stepOf.replace("{step}", String(step))}
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
                label={tf.villaNameLabel}
                id="trial-property-name"
                required
                autoComplete="organization"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                error={errors.property_name}
              />
              <div className="space-y-1.5">
                <span className="block text-sm font-semibold text-foreground">
                  {tf.destinationLabel}
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
                {tf.continue}
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
                <p className="font-semibold">{tf.summaryTitle}</p>
                <p className="mt-1 text-muted leading-relaxed">{summaryLine2}</p>
              </div>
              <Input
                label={tf.emailLabel}
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <Input
                label={tf.propertyUrlLabel}
                name="property_url"
                type="url"
                placeholder={tf.propertyUrlPlaceholder}
                autoComplete="url"
                error={errors.property_url}
              />
              <Select
                label={tf.destinationLabel}
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
                label={tf.whatsappLabel}
                name="whatsapp_e164"
                placeholder={tf.whatsappPlaceholder}
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
                  {tf.back}
                </Button>
                <Button
                  type="submit"
                  className="w-full flex-1"
                  size="lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? tf.launching : tf.submit}
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
          {tf.agreePrefix}{" "}
          <a href={termsHref} className="font-semibold text-accent hover:underline">
            {tf.terms}
          </a>{" "}
          {tf.and}{" "}
          <a href={privacyHref} className="font-semibold text-accent hover:underline">
            {tf.privacyPolicy}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
