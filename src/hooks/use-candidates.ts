import { useEffect, useState } from "react";

import type { Candidate } from "../resources/candidate";

/**
 * Candidate data should be fetched via network request:
 *  GET /api/v1/candidates
 *
 * The response body will be Candidate[]
 *
 * Do not import directly from the mocks directory
 */

async function fetchCandidates(): Promise<Candidate[]> {
  const res = await window.fetch("/api/v1/candidates");
  return res.json();
}

async function putCandidate(updatedCandidate: Candidate): Promise<Candidate> {
  const res = await window.fetch(`/api/v1/candidates/${updatedCandidate.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCandidate),
  });
  return res.json();
}
/**
 * useCandidates() is a hook that returns a list of candidates and a function
 * to update a single candidate.
 *
 * The list of candidates may be undefined if it is not yet populated.
 *
 * The updateCandidate function should persist the change and cause the list
 * of candidates to be updated accordingly.
 *
 * You may use the provided fetch functions above.
 */
export function useCandidates(): {
  candidates: Candidate[] | undefined;
  updateCandidate: (updatedCandidate: Candidate) => void;
} {
  const [candidates, setCandidates] = useState<Candidate[] | undefined>([]);

  // candidate list retrieved from backend on mount
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const data = await fetchCandidates();
    setCandidates(data);
  };

  // updateCandidate triggered when user clicks checkbox or point on plot
  // putCandidate is called followed by fetchCandidates to set new list in state
  const updateCandidate = async (updatedCandidate: Candidate) => {
    await putCandidate(updatedCandidate);
    await init();
  };

  return { candidates, updateCandidate };
}
