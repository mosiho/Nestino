"use client";

import { useState } from "react";
import Image from "next/image";
import type { Lang } from "../lib/i18n";
import { CONTACT_SIDE_IMAGE } from "../lib/silyan-images";
type Props = {
  lang: Lang;
  pathPrefix: string;
  phone: string;
  /** Subdomain for API (e.g. silyan). Sent as x-nestino-slug on fetch. */
  siteSlug: string;
  labels: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phoneLabel: string;
    villa: string;
    villaAny: string;
    villaBadem: string;
    villaDefne: string;
    villaIncir: string;
    arrival: string;
    departure: string;
    guests: string;
    message: string;
    submit: string;
    trust: string;
    waCta: string;
    success: string;
    error: string;
    demoNotice: string;
  };
};

export default function ContactInquiryForm({ lang, pathPrefix, phone, siteSlug, labels }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [villa, setVilla] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "demo">("idle");

  const digits = phone.replace(/\D/g, "");
  const waHref = digits ? `https://wa.me/${digits}` : "#";
  const pagePath = `${pathPrefix || ""}/${lang}/contact`.replace(/\/+/g, "/") || `/${lang}/contact`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const villaLine =
      villa === "badem"
        ? "Villa Badem"
        : villa === "defne"
          ? "Villa Defne"
          : villa === "incir"
            ? "Villa İncir"
            : labels.villaAny;
    const composedMessage = [
      `Villa: ${villaLine}`,
      arrival ? `Arrival: ${arrival}` : "",
      departure ? `Departure: ${departure}` : "",
      guests ? `Guests: ${guests}` : "",
      message ? `Note: ${message}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-nestino-slug": siteSlug,
        },
        body: JSON.stringify({
          language_code: lang,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          phone: phoneInput.trim() || undefined,
          message: composedMessage || undefined,
          metadata_json: {
            page_path: pagePath,
            villa_preference: villa || undefined,
          },
        }),
      });

      if (res.status === 503) {
        setStatus("demo");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhoneInput("");
      setVilla("");
      setArrival("");
      setDeparture("");
      setGuests("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-[var(--shadow-md)] order-2 lg:order-1">
        <Image src={CONTACT_SIDE_IMAGE} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>

      <div className="order-1 lg:order-2">
        <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-2">{labels.title}</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">{labels.subtitle}</p>

        {status === "success" && (
          <p className="mb-6 p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)]">
            {labels.success}
          </p>
        )}
        {status === "error" && (
          <p className="mb-6 p-4 rounded-md border border-red-200 bg-red-50 text-sm text-red-900 dark:bg-red-950/30 dark:text-red-200 dark:border-red-900">
            {labels.error}
          </p>
        )}
        {status === "demo" && (
          <p className="mb-6 p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-secondary)]">
            {labels.demoNotice}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="inq-name" className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
              {labels.name} *
            </label>
            <input
              id="inq-name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
            />
          </div>
          <div>
            <label htmlFor="inq-email" className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
              {labels.email} *
            </label>
            <input
              id="inq-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
            />
          </div>
          <div>
            <label htmlFor="inq-phone" className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
              {labels.phoneLabel}
            </label>
            <input
              id="inq-phone"
              name="phone"
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
            />
          </div>
          <div>
            <label htmlFor="inq-villa" className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
              {labels.villa}
            </label>
            <select
              id="inq-villa"
              name="villa"
              value={villa}
              onChange={(e) => setVilla(e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
            >
              <option value="">{labels.villaAny}</option>
              <option value="badem">{labels.villaBadem}</option>
              <option value="defne">{labels.villaDefne}</option>
              <option value="incir">{labels.villaIncir}</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="inq-arrival" className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
                {labels.arrival}
              </label>
              <input
                id="inq-arrival"
                name="arrival"
                type="date"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
              />
            </div>
            <div>
              <label htmlFor="inq-departure" className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
                {labels.departure}
              </label>
              <input
                id="inq-departure"
                name="departure"
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="inq-guests" className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
              {labels.guests}
            </label>
            <input
              id="inq-guests"
              name="guests"
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
            />
          </div>
          <div>
            <label htmlFor="inq-message" className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">
              {labels.message}
            </label>
            <textarea
              id="inq-message"
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium text-white disabled:opacity-60"
            style={{ backgroundColor: "var(--accent-500)" }}
          >
            {labels.submit}
          </button>
        </form>

        <p className="mt-4 text-xs text-[var(--color-text-muted)]">{labels.trust}</p>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--accent-500)" }}
          >
            {labels.waCta} →
          </a>
          {digits && (
            <a href={`tel:${phone}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--accent-500)]">
              {phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
