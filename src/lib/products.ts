import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export const getLatestProducts = async () => {
  try {
    const productsRef = collection(db, "Products");
    const q = query(productsRef, orderBy("createdAt", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (err) {
    console.error("Ürünler çekilirken hata oluştu:", err);
    return [];
  }
};

export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, "Products");
    const q = query(productsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (err) {
    console.error("Ürünler çekilirken hata oluştu:", err);
    return [];
  }
};
