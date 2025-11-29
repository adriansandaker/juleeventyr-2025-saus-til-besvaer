import { FormEvent } from "react";

import styles from "./Saus.module.css";

const Saus = () => {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <div className={`metallicss ${styles.container}`}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Saus-O-Matic 3000</legend>
          <div className={styles.formElement}>
            <label htmlFor="amount">Mengde</label>
            <select name="amount">
              <option>Test</option>
            </select>
          </div>
        </fieldset>

        <button type="submit">Generer saus</button>
      </form>
    </div>
  );
};

export default Saus;
