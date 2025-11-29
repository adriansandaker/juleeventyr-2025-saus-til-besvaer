import Oppskrift from "@/components/Oppskrift/Oppskrift";
import styles from "./home.module.css";
import Saus from "@/components/Saus/Saus";

const Home: React.FC = () => {
  return (
    <main>
      <section className={styles.table}>
        <Oppskrift />
        <div className={styles.coffee} />
        <div className={styles.flour} />
        <div className={styles.butter} />
        <Saus />
      </section>
    </main>
  );
};

export default Home;
