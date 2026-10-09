// Central brand configuration. URLs verified on amrinkhan.com (Oct 2026).
// Images are Amrin Khan's own photography as published on amrinkhan.com, re-encoded to WebP at native resolution (never upscaled).
import heroDesktop from "@/assets/brand/hero-desktop.webp.asset.json";
import heroMobile from "@/assets/brand/hero-mobile.webp.asset.json";
import craftWide from "@/assets/brand/craft-wide.webp.asset.json";
import craftGroup from "@/assets/brand/craft-group.webp.asset.json";
import campaignRed from "@/assets/brand/campaign-red.webp.asset.json";
import galicha from "@/assets/brand/galicha.webp.asset.json";
import ruksati from "@/assets/brand/ruksati.webp.asset.json";
import couture from "@/assets/brand/couture.webp.asset.json";
import ibtida from "@/assets/brand/ibtida.webp.asset.json";
import lehenga from "@/assets/brand/lehenga.webp.asset.json";
import saree from "@/assets/brand/saree.webp.asset.json";
import contemporary from "@/assets/brand/contemporary.webp.asset.json";
import sherwani from "@/assets/brand/sherwani.webp.asset.json";

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

export type BrandImage = { src: string; w: number; h: number; alt: string; position?: string };
const img = (a: { url: string }, w: number, h: number, alt: string, position?: string): BrandImage => ({ src: a.url, w, h, alt, ...(position ? { position } : {}) });

export const IMAGES = {
  heroDesktop: img(heroDesktop, 2000, 980, "Amrin Khan bridal couture campaign — brides in red lehengas with grooms in ivory sherwanis", "50% 35%"),
  heroMobile: img(heroMobile, 700, 980, "Amrin Khan bridal couture campaign", "50% 30%"),
  craftWide: img(craftWide, 2000, 980, "Models in embellished blush Amrin Khan lehengas in a heritage courtyard", "60% 40%"),
  craftGroup: img(craftGroup, 2000, 980, "Brides in red embroidered Amrin Khan lehengas on a palace terrace", "50% 30%"),
  campaignRed: img(campaignRed, 800, 559, "Amrin Khan couture campaign in a candlelit setting"),
  galicha: img(galicha, 800, 559, "Ivory embellished Amrin Khan lehenga"),
  ruksati: img(ruksati, 800, 559, "Ruksati — bride in a red lehenga on marigold-lined steps"),
  couture: img(couture, 800, 559, "Couture — red bridal lehenga with embroidered dupatta"),
  ibtida: img(ibtida, 800, 559, "Ibtida — embroidered lehenga with veil"),
  lehenga: img(lehenga, 600, 444, "Ivory and gold Amrin Khan lehenga"),
  saree: img(saree, 600, 444, "Amrin Khan pre-draped saree in wine and blush"),
  contemporary: img(contemporary, 600, 444, "Amrin Khan contemporary skirt set with ruffled detail"),
  sherwani: img(sherwani, 600, 444, "Amrin Khan ivory embroidered sherwani"),
};

export const SOCIAL = [
  ["Instagram", "https://www.instagram.com/amrinkhanofficial/"],
  ["Facebook", "https://www.facebook.com/amrinkhanflagshipstore/"],
] as const;
