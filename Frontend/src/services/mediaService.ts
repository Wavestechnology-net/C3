import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase.config";
import type { MediaDto, MediaUploadDto } from "../types";

const mediaCollectionRef = collection(db, "media");

export const getAllMedia = async (): Promise<MediaDto[]> => {
  const snapshot = await getDocs(mediaCollectionRef);
  const mediaList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as MediaDto));
  return mediaList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const uploadMedia = async ({ file, altText }: MediaUploadDto): Promise<void> => {
  const filePath = `media/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);
  const mediaUrl = await getDownloadURL(storageRef);

  await addDoc(mediaCollectionRef, {
    fileName: file.name,
    mediaUrl,
    storagePath: filePath, // Store the path for deletion
    mediaType: file.type,
    altText,
    createdAt: new Date().toISOString(),
  });
};

export const deleteMedia = async (media: MediaDto): Promise<void> => {
    if (!media.id) return;
    
    // Delete firestore document
    const mediaDoc = doc(db, "media", media.id.toString());
    await deleteDoc(mediaDoc);

    // Delete file from storage
    if (media.storagePath) {
        const storageRef = ref(storage, media.storagePath);
        await deleteObject(storageRef);
    }
};