export interface Page {
  id: number;
  slug: string;
  title: string | null;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
}

export interface Section {
  id: number;
  page_id: number;
  name: string;
  section_type: string;
  sort_order: number;
  background_media_id: number | null;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
}

export interface Content {
  id: number;
  section_id: number;
  content_key: string;
  content_type: string;
  value: string | null;
  locale: string | null;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
}

export interface Media {
  id: number;
  file_name: string | null;
  media_url: string;
  media_type: string;
  alt_text: string | null;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
}

export interface ContentMedia {
  id: number;
  content_id: number;
  media_id: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
}