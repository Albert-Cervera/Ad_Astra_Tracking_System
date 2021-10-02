import { db } from '@/firebase'
import { TEST_COLLECTION } from '@/constants/collections'

const testsRef = db.collection(TEST_COLLECTION)

export const getTestData = async () => {
  let response
  let error
  try {
    const snapshot = await testsRef.get()
    response = snapshot.docs[0].data()
  } catch (e) {
    error = e
  }

  return { response, error }
}
