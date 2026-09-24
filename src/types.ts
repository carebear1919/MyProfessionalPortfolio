export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription?: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
    canva?: string;
  };
  year: string;
  role: string;
  featured: boolean;
  mediaType: 'image' | 'svg' | 'canvas';
  status?: 'finished' | 'ongoing';
  tagline?: string;
  images?: string[];
  pdfUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: {
    name: string;
    level: number; // percentage
    description: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  tag: string; // e.g. "Core Architecture", "UX/UI Design"
}

export interface Service {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  scrollTo?: string; // section id to scroll to
  filter?: string; // Projects category to show
}
