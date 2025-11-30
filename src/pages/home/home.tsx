import Oppskrift from "@/components/Oppskrift/Oppskrift";
import styles from "./home.module.css";
import Radio from "@/components/Radio/Radio";
import Dialogue from "@/components/Dialogue/Dialogue";

const dialogues = [
  {
    speaker: "SHELLStrøm",
    text: "Se her hva jeg fant! Bestemors fantastiske oppskrift på ribbesaus! Denne var onkel Arne sin favoritt. ⭐️",
  },
  { speaker: "SHELLStrøm", text: "Men... Å nei! Papiret har gått i stykker! Det må være den sniken RAMsay som har gjort dette. 👺" },
  { speaker: "SHELLStrøm", text: "Jeg visste jeg skulle ha skrevet ut flere eksemplarer..." },
  { speaker: "SHELLStrøm", text: "Kanskje dere kan finne ut av dette?" },
];

const Home: React.FC = () => {
  return (
    <main>
      <section className={styles.table}>
        <Oppskrift />
        <div id="coffee" className={styles.coffee} />
        <div id="flour" className={styles.flour} />
        <div id="butter" className={styles.butter} />
        <Radio />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "20%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Dialogue dialogues={dialogues} />
        </div>
      </section>
    </main>
  );
};

export default Home;
