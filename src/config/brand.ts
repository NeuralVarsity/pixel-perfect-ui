// Central brand configuration. All URLs below were verified on amrinkhan.com (Oct 2026).
import heroImg from "@/assets/hero.jpg";
import sareeImg from "@/assets/saree.jpg";
import menswearImg from "@/assets/menswear.jpg";
import detailImg from "@/assets/detail.jpg";
import contemporaryImg from "@/assets/contemporary.jpg";

export const SITE = "https://amrinkhan.com";
export const PHONE = "+91 98246 77719";
export const PHONE_TEL = "+919824677719";
export const EMAIL = "info@amrinkhan.com";

// WhatsApp stays hidden until the business confirms this number is active on WhatsApp.
export const WHATSAPP = {
  enabled: false,
  number: "919824677719", // digits only, international format
  message: "Hello Amrin Khan team, I'd like to enquire about your couture collections for an upcoming occasion.",
};
export const whatsappUrl = () =>
  `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`;

export const LINKS = {
  collections: `${SITE}/collections`,
  womens: `${SITE}/womens-wear`,
  mens: `${SITE}/mens-wear`,
  story: `${SITE}/ourstory`,
  faqs: `${SITE}/faqs`,
  contact: `${SITE}/contactus`,
  returns: `${SITE}/return_exchange`,
  privacy: `${SITE}/privacy_policy`,
  terms: `${SITE}/terms_and_conditions`,
};

export const WOMEN: [string, string][] = [
  ["Lehengas", "/womens-wear/lehenga"],
  ["Sarees", "/womens-wear/saree"],
  ["Contemporary Wear", "/womens-wear/contemporary"],
  ["Kurta Sets", "/womens-wear/kurta-set"],
  ["Jacket Sets", "/womens-wear/jacket-set"],
  ["Pant Sets", "/womens-wear/pant-set"],
  ["Skirt Sets", "/womens-wear/skirt-set"],
  ["Gowns", "/womens-wear/gown"],
  ["Anarkali Sets", "/womens-wear/anarkali-set"],
  ["Jumpsuits", "/womens-wear/jumpsuit"],
];
export const MEN: [string, string][] = [
  ["Sherwani Sets", "/mens-wear/sherwani-set"],
  ["Jacket Sets", "/mens-wear/jacket-set"],
  ["Kurta Sets", "/mens-wear/kurta-set"],
];
export const COLLECTIONS: [string, string][] = [
  ["NAYAB", "/nayab"],
  ["KAHANIYAAN", "/kahaniyaan"],
  ["Tassavur", "/tassavur"],
  ["Ibtida", "/ibtida"],
  ["Ruksati", "/ruksati"],
  ["Couture", "/couture-"],
];

/**
 * Images. TEMPORARY: these are AI-generated previews, NOT authentic Amrin Khan photography.
 * Replace `src` with authorised campaign/product images (keep similar aspect ratios).
 */
export const IMAGES = {
  hero: { src: heroImg, w: 1920, h: 1088, alt: "Bride in a burgundy lehenga with gold embroidery (preview image)", position: "70% center" },
  lehenga: { src: heroImg, w: 1920, h: 1088, alt: "Lehenga (preview image)" },
  saree: { src: sareeImg, w: 832, h: 1152, alt: "Saree (preview image)" },
  contemporary: { src: contemporaryImg, w: 832, h: 1152, alt: "Contemporary wear (preview image)" },
  menswear: { src: menswearImg, w: 832, h: 1152, alt: "Men's sherwani (preview image)" },
  detail: { src: detailImg, w: 1152, h: 832, alt: "Close-up of hand embroidery (preview image)" },
};
