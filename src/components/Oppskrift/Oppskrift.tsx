import styles from './Oppskrift.module.css';

const Oppskrift = () => {
  return (
     <div id="oppskrift" className={styles.container}>
        <h1>Bestemors Ribbesaus</h1>
        <ul>
          <li>4 ss smør</li>
          <li>4 ss hvetemel</li>
          <li>1 l kjøttkraft eller buljong</li>
          <li>2 dl ribbefett</li>
          <li>salt</li>
          <li>pepper </li>
        </ul>
        <p>Brun smøret i en kjele. Ha i hvetemelet og brun blandingen under omrøring.</p>
        <p>Ha på kraften og la koke under omrøring i 10 minutter.</p>
        <p>Pisk inn ribbefettet i sausen. Smak til med salt og pepper.</p>
        <p className={styles.reminder}>Og for all del, ikke glem den hemmelige ingrediensen:</p>
      </div>
  )
}

export default Oppskrift;
