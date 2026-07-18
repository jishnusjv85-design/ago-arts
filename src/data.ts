/* ============================================================
   Obsidian Ink — Content
   ============================================================ */

export type Category =
  | "All"
  | "Blackwork"
  | "Realism"
  | "Traditional"
  | "Fine Line";

export interface Work {
  src: string;
  title: string;
  category: Exclude<Category, "All">;
  span: boolean;
}

export const categories: Category[] = [
  "All",
  "Blackwork",
  "Realism",
  "Traditional",
  "Fine Line",
];

export const works: Work[] = [
  {
    src: "/images/portfolio_blackwork.png",
    title: "Memento Skull",
    category: "Traditional",
    span: true,
  },
  {
    src: "/images/portfolio_realism.png",
    title: "Shadow Ornament",
    category: "Blackwork",
    span: false,
  },
  {
    src: "/images/portfolio_japanese.png",
    title: "Crown of Horns",
    category: "Realism",
    span: false,
  },
  {
    src: "/images/portfolio_fineline.png",
    title: "Zeus Ascending",
    category: "Realism",
    span: true,
  },
  {
    src: "/images/hero.jpg",
    title: "Smoked Linework",
    category: "Blackwork",
    span: false,
  },
  {
    src: "/images/about.jpg",
    title: "Whispered Lines",
    category: "Fine Line",
    span: false,
  },
  {
    src: "/images/hero_bg.png",
    title: "Botanical Bloom",
    category: "Realism",
    span: true,
  },
  {
    src: "/images/portfolio_blackwork.png",
    title: "Heritage Sleeve",
    category: "Traditional",
    span: false,
  },
  {
    src: "/images/portfolio_realism.png",
    title: "Spine of Petals",
    category: "Blackwork",
    span: false,
  },
];

export interface Specialty {
  no: string;
  title: string;
  desc: string;
}

export const specialties: Specialty[] = [
  {
    no: "01",
    title: "Blackwork",
    desc: "Bold, high-contrast darkness. Geometry, dotwork and mandalas that command the skin.",
  },
  {
    no: "02",
    title: "Fine Line",
    desc: "Delicate, single-needle precision. Micro details and whisper-thin botanical strokes.",
  },
  {
    no: "03",
    title: "Realism",
    desc: "Photographic depth and portraits rendered in light, shadow and uncanny detail.",
  },
  {
    no: "04",
    title: "Traditional",
    desc: "Timeless Americana — bold outlines, saturated colour and iconic old-school flash.",
  },
  {
    no: "05",
    title: "Japanese Irezumi",
    desc: "Flowing mythological bodysuits — dragons, koi and cherry blossom in living motion.",
  },
  {
    no: "06",
    title: "Sacred Geometry",
    desc: "Symmetry and ritual pattern. Mandala, metatron and ornamental sleeve architecture.",
  },
];

export interface Artist {
  name: string;
  role: string;
  specialty: string;
  img: string;
  experience: string;
}

export const artists: Artist[] = [
  {
    name: "Luna Vance",
    role: "Founder · Master Artist",
    specialty: "Fine Line · Botanical",
    img: "/images/artist_profile_1.png",
    experience: "15 yrs",
  },
  {
    name: "Dario Cross",
    role: "Senior Artist",
    specialty: "Blackwork · Sacred Geometry",
    img: "/images/artist_profile_2.png",
    experience: "11 yrs",
  },
  {
    name: "Mara Stone",
    role: "Resident Artist",
    specialty: "Realism · Colour",
    img: "/images/profile_avatar.jpg",
    experience: "9 yrs",
  },
];

export interface Step {
  no: string;
  title: string;
  desc: string;
}

export const processSteps: Step[] = [
  {
    no: "01",
    title: "Consultation",
    desc: "We talk vision, placement, meaning and budget. No pressure — just honest creative direction.",
  },
  {
    no: "02",
    title: "Custom Design",
    desc: "Your idea becomes a one-of-a-kind drawing. We refine together until every line feels right.",
  },
  {
    no: "03",
    title: "The Session",
    desc: "Sterile, calm and collaborative. Settle in while our artists translate ink into permanence.",
  },
  {
    no: "04",
    title: "Aftercare",
    desc: "Leave with a full healing plan and our open door. We protect your piece long after you leave.",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Obsidian Ink turned a half-formed idea into the most meaningful piece I own. The artistry and care were beyond anything I expected.",
    name: "Elena R.",
    detail: "Full sleeve · 3 sessions",
  },
  {
    quote:
      "Calm, spotless studio and an artist who actually listened. My fine-line piece healed flawlessly. I won't go anywhere else.",
    name: "Marcus T.",
    detail: "Fine line · sternum",
  },
  {
    quote:
      "The realism is unreal — people literally stop me on the street. Worth every minute and every penny.",
    name: "Priya K.",
    detail: "Realism portrait · forearm",
  },
];

/* ----------------------------------------------------------------
   Instagram feed (posts + reels)
   To use YOUR account: paste each post's/reel's thumbnail or video
   URL into `thumb` (and `video` for reels) and set `link` to the
   real Instagram post URL. Live auto-sync needs the Instagram Graph
   API (Business account + token) — see the README note in App.tsx.
---------------------------------------------------------------- */
export interface IGPost {
  id: string;
  type: "reel" | "post";
  thumb: string;
  video?: string;
  caption: string;
  likes: string;
  comments: string;
  link: string;
}

export const instagramProfile = {
  handle: "@obsidian.ink",
  name: "OBSIDIAN INK STUDIO",
  avatar: "/images/profile_avatar.jpg",
  bio: "Custom black & gold tattoos • Est. 2009 • Booking via DM or the link below",
  link: "https://www.instagram.com/",
  stats: { posts: "842", followers: "128K", following: "312" },
};

export const instagramPosts: IGPost[] = [
  {
    id: "ig1",
    type: "reel",
    thumb: "/images/portfolio_fineline.png",
    video: "/images/ago___art__2023-06-04_CtEGVeIhhXL_0.mp4",
    caption: "Detail from today's forearm session — single needle, infinite patience. 🖋️",
    likes: "4,128",
    comments: "184",
    link: "https://www.instagram.com/",
  },
  {
    id: "ig2",
    type: "post",
    thumb: "/images/portfolio_blackwork.png",
    caption: "Studio days. Fresh flash dropping this Friday — DM to claim a piece.",
    likes: "2,640",
    comments: "97",
    link: "https://www.instagram.com/",
  },
  {
    id: "ig3",
    type: "reel",
    thumb:
      "https://images.pexels.com/videos/7030907/pexels-photo-7030907.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    video:
      "https://videos.pexels.com/video-files/7030907/7030907-hd_1066_1920_25fps.mp4",
    caption: "Sound on for the buzz 🎧 — six hours, one sitting.",
    likes: "8,902",
    comments: "521",
    link: "https://www.instagram.com/",
  },
  {
    id: "ig4",
    type: "post",
    thumb:
      "https://images.pexels.com/photos/29877731/pexels-photo-29877731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    caption: "The tools of the trade. Stay sterile, stay sharp.",
    likes: "1,873",
    comments: "62",
    link: "https://www.instagram.com/",
  },
  {
    id: "ig5",
    type: "reel",
    thumb:
      "https://images.pexels.com/videos/4125839/pexels-photo-4125839.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    video:
      "https://videos.pexels.com/video-files/4125839/4125839-uhd_2160_4096_25fps.mp4",
    caption: "Lining in progress. No stencil — just freehand confidence.",
    likes: "5,317",
    comments: "246",
    link: "https://www.instagram.com/",
  },
  {
    id: "ig6",
    type: "post",
    thumb:
      "https://images.pexels.com/photos/37517992/pexels-photo-37517992.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    caption: "Full sleeve reveal — months of work, a lifetime of ink.",
    likes: "11,204",
    comments: "638",
    link: "https://www.instagram.com/",
  },
  {
    id: "ig7",
    type: "post",
    thumb:
      "https://images.pexels.com/photos/3279570/pexels-photo-3279570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    caption: "Quiet hands. Loud art.",
    likes: "3,041",
    comments: "118",
    link: "https://www.instagram.com/",
  },
  {
    id: "ig8",
    type: "reel",
    thumb:
      "https://images.pexels.com/videos/4125828/pexels-photo-4125828.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    video:
      "https://videos.pexels.com/video-files/4125828/4125828-uhd_2160_4096_25fps.mp4",
    caption: "Behind the curtain at Obsidian Ink. ✨",
    likes: "6,755",
    comments: "309",
    link: "https://www.instagram.com/",
  },
  {
    id: "ig9",
    type: "post",
    thumb:
      "https://images.pexels.com/photos/12742814/pexels-photo-12742814.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    caption: "Healed & crisp. Blackwork that ages like a relic.",
    likes: "4,520",
    comments: "201",
    link: "https://www.instagram.com/",
  },
];

export const navLinks = [
  { label: "Studio", href: "#about" },
  { label: "Craft", href: "#specialties" },
  { label: "Gallery", href: "#gallery" },
  { label: "Feed", href: "#instagram" },
  { label: "Artists", href: "#artists" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#booking" },
];
