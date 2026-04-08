import { z } from "zod";

const destinationValues = [
  "bali",
  "thailand",
  "europe",
  "caribbean",
  "other",
] as const;

const destinationEnum = z.enum(destinationValues);

export const trialActivateRequestSchema = z
  .object({
    property_name: z.string().trim().min(1, "Property name is required").max(200),
    email: z.string().trim().email("Valid email required").max(320),
    property_url: z.string().trim().max(2048).optional(),
    destination: destinationEnum,
    whatsapp_e164: z.string().trim().max(20).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.property_url?.length) {
      const ok = (() => {
        try {
          const u = new URL(data.property_url as string);
          return u.protocol === "http:" || u.protocol === "https:";
        } catch {
          return false;
        }
      })();
      if (!ok) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must be a valid URL",
          path: ["property_url"],
        });
      }
    }
    if (data.whatsapp_e164?.length) {
      if (!/^\+[1-9]\d{6,14}$/.test(data.whatsapp_e164)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Use E.164 format, e.g. +6281234567890",
          path: ["whatsapp_e164"],
        });
      }
    }
  })
  .transform((data) => ({
    property_name: data.property_name,
    email: data.email.toLowerCase(),
    destination: data.destination,
    property_url:
      data.property_url && data.property_url.length > 0
        ? data.property_url
        : undefined,
    whatsapp_e164:
      data.whatsapp_e164 && data.whatsapp_e164.length > 0
        ? data.whatsapp_e164
        : undefined,
  }));

export type TrialActivateRequest = z.infer<typeof trialActivateRequestSchema>;
