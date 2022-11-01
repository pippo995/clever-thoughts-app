import { db } from "../firebase-config";

import {
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const QuoteCollectionRef = collection(db, "quotes");

class QuoteDataService {
  addQuotes = (newQuote) => {
    return addDoc(QuoteCollectionRef, newQuote);
  };

  updateQuote = (id, updatedQuote) => {
    const quoteDoc = doc(db, "quotes", id);
    return updateDoc(quoteDoc, updatedQuote);
  };

  deleteQuote = (id) => {
    const quoteDoc = doc(db, "quotes", id);
    return deleteDoc(quoteDoc);
  };

  getAllQuotes = () => {    
    const q = query(QuoteCollectionRef, orderBy("dt", "desc"));
    return getDocs(q);
  };

  getQuote = (id) => {
    const quoteDoc = doc(db, "quotes", id);
    return getDoc(quoteDoc);
  };
}

export default new QuoteDataService();
