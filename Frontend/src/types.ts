export interface ContentType {
  id: number;
  contentKey: string;
  contentType: string;
  value: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface SectionType {
  id: number;
  pageId: number;
  name: string;
  sectionType: string;
  sortOrder: number;
  backgroundMediaId?: number;
  contents?: ContentType[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface PageType {
  id: number;
  slug: string;
  title: string | null;
  sections: SectionType[];
  isActive: boolean;
}

export interface PageDto {
  id: number;
  slug: string;
  title: string | null;
  sections: SectionDto[];
}

export interface SectionDto {
  id: number;
  name: string;
  sectionType: string;
  sortOrder: number;
  contents: ContentDto[];
  backgroundMediaId?: number;
}

export interface ContentDto {
  id: number;
  contentKey: string;
  contentType: string;
  value: string | null;
  sortOrder: number;
}

export interface MediaDto {
  id: number;
  fileName?: string;
  mediaUrl: string;
  mediaType?: string;
  isActive: boolean;
  altText?: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface MediaUploadDto {
  file: File;
  altText: string;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}