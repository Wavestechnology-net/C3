import { collection, getDocs, doc, query, where, writeBatch } from "firebase/firestore";
import { db } from "../firebase.config";
import type { PageDto, SectionDto, ContentDto } from "../types";

export const getPages = async (): Promise<PageDto[]> => {
    const pagesCollectionRef = collection(db, "pages");
    const snapshot = await getDocs(pagesCollectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as PageDto));
};

export const getPageBySlug = async (slug: string): Promise<PageDto | null> => {
    const pagesCollectionRef = collection(db, "pages");
    const q = query(pagesCollectionRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const pageDoc = snapshot.docs[0];
    const pageData = { id: pageDoc.id, ...pageDoc.data() } as PageDto;

    const sectionsCollectionRef = collection(db, "pages", pageDoc.id, "sections");
    const sectionsSnapshot = await getDocs(sectionsCollectionRef);
    
    const sections = await Promise.all(sectionsSnapshot.docs.map(async (sectionDoc) => {
        const sectionData = { id: sectionDoc.id, ...sectionDoc.data() } as SectionDto;

        const contentCollectionRef = collection(db, "pages", pageDoc.id, "sections", sectionDoc.id, "contents");
        const contentSnapshot = await getDocs(contentCollectionRef);
        sectionData.contents = contentSnapshot.docs.map(contentDoc => ({ id: contentDoc.id, ...contentDoc.data() } as ContentDto));
        
        return sectionData;
    }));

    pageData.sections = sections;
    return pageData;
};

export const getSectionsByPageId = async (pageId: string): Promise<SectionDto[]> => {
    const sectionsCollectionRef = collection(db, "pages", pageId, "sections");
    const sectionsSnapshot = await getDocs(sectionsCollectionRef);

    const sections = await Promise.all(sectionsSnapshot.docs.map(async (sectionDoc) => {
        const sectionData = { id: sectionDoc.id, ...sectionDoc.data() } as SectionDto;

        const contentCollectionRef = collection(db, "pages", pageId, "sections", sectionDoc.id, "contents");
        const contentSnapshot = await getDocs(contentCollectionRef);
        sectionData.contents = contentSnapshot.docs.map(contentDoc => ({ id: contentDoc.id, ...contentDoc.data() } as ContentDto));
        
        return sectionData;
    }));

    return sections;
};

export const updateSection = async (pageId: string, sectionId: string, contents: ContentDto[]): Promise<void> => {
    const batch = writeBatch(db);

    for (const contentItem of contents) {
        if (contentItem.id) {
            const contentDocRef = doc(db, "pages", pageId, "sections", sectionId, "contents", contentItem.id.toString());
            batch.update(contentDocRef, { value: contentItem.value });
        }
    }

    await batch.commit();
};