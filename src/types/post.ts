export interface DocumentPost {
  typeOfDocument: "Guide" | "Organization Overview" | "Page" | "Other";
  originalTitle: string;
  rewrittenTitle: string;
  audience: string;
  summary: string;
  category: string;
  tags: string[];
  language: string;
  lastUpdatedOn: string;
  originalURL: string;
  officers: Array<{ name: string; position: string; context: string }>;
  primaryOrganization: { name: string; role: string };
  organizationsMentioned: Array<{ name: string; role: string }>;
  phoneNumbers: Array<{ number: string; context: string }>;
  emails: Array<{ address: string; context: string }>;
  websites: Array<{ url: string; context: string }>;
  legislationMentioned: Array<{ name: string; context: string }>;

  originalText: string;
  rewrittenText: string;
  slug: string;
  originalTextScore: string;
}
