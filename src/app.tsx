import styles from "./app.module.css";
import { Container } from "./components/container";
import { Navbar } from "./components/navbar";
import { Plot } from "./components/plot";
import { useCandidates } from "./hooks/use-candidates";
import type { Candidate } from "./resources/candidate";

export const MAX_SELECTIONS = 5;

export default function App() {
  const { candidates, updateCandidate } = useCandidates();

  /* onSelect is triggered when user clicks on plot point, calling updateCandidate and reflected
    solid mark on plot and check mark in candidate list*/
  const onSelect = (id: string | undefined) => {
    const currentCandidate = candidates?.find(
      (candidate) => candidate.id === id
    );

    if (currentCandidate) {
      updateCandidate({
        ...currentCandidate,
        selected: !currentCandidate.selected,
      });
    }
  };

  /* handleCheck is triggered when user clicks on plot point, calling updateCandidate and reflected
    check mark in candidate list and solid mark on plot */
  const handleCheck = (candidate: Candidate) => {
    const updatedCandidate = { ...candidate, selected: !candidate.selected };
    updateCandidate(updatedCandidate);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Container title="Ranked Candidates" className={styles.rank}>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {candidates?.map((candidate) => {
                  return (
                    <tr key={candidate.id}>
                      <td>{candidate.score.toFixed(2)}</td>
                      <td>
                        <label>
                          {candidate?.id}
                          <input
                            type="checkbox"
                            role="checkbox"
                            name={candidate?.id}
                            checked={candidate?.selected}
                            onClick={() => handleCheck(candidate)}
                          />
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
        <Container title="Candidate Performance" className={styles.performance}>
          {candidates ? (
            <Plot
              ingredient="sugar"
              candidates={candidates}
              maxSelections={MAX_SELECTIONS}
              onSelect={onSelect}
            />
          ) : (
            "loading..."
          )}
        </Container>
      </main>
    </>
  );
}
