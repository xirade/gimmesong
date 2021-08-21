import { watchEffect, ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      // need to make sure the doc exists & has data
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        // update values
        error.value = null;
      } else {
        error.value = "this document does not exist";
      }
    },
    (err) => {
      console.log(err.message);
      error.value = "could not fetch the document";
    }
  );

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
