export interface ContentDto {
  id: string;
  contentKey: string;
  contentType: string;
  value: string | null;
  sortOrder: number;
}

export interface SectionDto {
  id: string;
  name: string;
  sectionType: string;
  sortOrder: number;
  contents: ContentDto[];
  backgroundMediaId?: number;
}

export interface PageDto {
  id: string;
  slug: string;
  title: string | null;
  sections: SectionDto[];
}

export interface MediaDto {
  id: string;
  fileName?: string;
  mediaUrl: string;
  storagePath: string;
  mediaType?: string;
  altText?: string;
  createdAt: string;
}

export interface MediaUploadDto {
  file: File;
  altText: string;
}