import SectionHeader from "./SectionHeader";
import { MONO, FAINT, CARD, SECTION } from "./styles";

const LABEL_MAP = {
  seo: "SEO",
  aiSearch: "AI Search Optimisation",
  website: "Website",
  googleAds: "Google Ads",
  metaAds: "Meta Ads",
  localSeo: "Local SEO",
  content: "Content Strategy",
  emailMarketing: "Email Marketing",
  automation: "Marketing Automation",
  retention: "Customer Retention",
  audienceTargeting: "Audience Targeting",
  adCreatives: "Ad Creatives",
  remarketing: "Remarketing",
  websiteSeo: "Website SEO",
  gmbProfiles: "GMB Profiles",
  offPageSeo: "Off-Page SEO",
  contentStrategy: "Content Strategy",
  localCitations: "Local Citations",
  keywordStrategy: "Keyword Strategy",
  onPageSeo: "On-Page SEO",
  technicalSeo: "Technical SEO",
  backlinkBuilding: "Backlink Building",
  productSeo: "Product SEO",
  contentMarketing: "Content Marketing",
  linkBuilding: "Link Building",
  websiteOptimisation: "Website Optimisation",
  paidAdvertising: "Paid Advertising",
  landingPageOptimisation: "Landing Page Optimisation",
  seoStrategy: "SEO Strategy",
  leadNurturing: "Lead Nurturing",
  audienceStrategy: "Audience Strategy",
  facebookPresence: "Facebook Presence",
  leadGeneration: "Lead Generation",
  campaignOptimisation: "Campaign Optimisation",
  socialMedia: "Social Media",
  localSearch: "Local Search",
  paidCampaigns: "Paid Campaigns",
  brandConsistency: "Brand Consistency",
  conversionFocus: "Conversion Focus",
  paidMarketing: "Paid Marketing",
  locationPages: "Location Pages",
  onPageOptimisation: "On-Page Optimisation",
  socialMediaMarketing: "Social Media Marketing",
};

function humanizeKey(key) {
  if (LABEL_MAP[key]) return LABEL_MAP[key];
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export default function ChangesTimeline({ changes, chapter = "05" }) {
  if (!changes) return null;

  // Extract optional title from changes
  const { title: customTitle, ...changeItems } = changes;

  // Flatten both direct string items and nested category objects
  const entries = [];
  Object.entries(changeItems).forEach(([key, val]) => {
    if (typeof val === "string" && val.trim()) {
      entries.push({
        key,
        category: null,
        title: humanizeKey(key),
        desc: val,
      });
    } else if (val && typeof val === "object" && !Array.isArray(val)) {
      const parentCategory = humanizeKey(key);
      Object.entries(val).forEach(([subKey, subVal]) => {
        if (typeof subVal === "string" && subVal.trim()) {
          entries.push({
            key: `${key}_${subKey}`,
            category: parentCategory,
            title: humanizeKey(subKey),
            desc: subVal,
          });
        }
      });
    }
  });

  if (entries.length === 0) return null;

  const sectionTitle = customTitle
    ? `What We Changed: ${customTitle}`
    : "What We Changed";

  return (
    <section className={SECTION} id="changes">
      <SectionHeader
        chapter={chapter}
        eyebrow="Implementation"
        aside="Transformation Roadmap"
        title={sectionTitle}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {entries.map((item, idx) => (
          <div
            className={`${CARD} flex items-start gap-4 p-5 transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--b2b-primary)_40%,transparent)]`}
            key={item.key || idx}
          >
            <div className={`${MONO} text-lg font-black leading-none text-[var(--b2b-primary)]`}>
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div>
              {item.category && (
                <span className={`${MONO} block mb-1 text-[9.5px] tracking-[0.05em] uppercase ${FAINT}`}>
                  {item.category}
                </span>
              )}
              <h3 className="mb-1.5 text-[14.5px] font-bold text-[var(--b2b-ink)]">{item.title}</h3>
              <p className="text-[13px] leading-[1.55] text-[var(--b2b-mute)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
