import Image from "next/image";
import NyhedsbrevsTilmelding from "../NyhedsbrevsTilmeldning/NyhedsbrevsTilmeldning";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Footerens fem kolonner samler links, nyhedsbrev og kontaktoplysninger. */}
      <div className={styles.grid}>
        <div>
          <h4>For jobsøgere</h4>
          <ul>
            <li>Din kundeside</li>
            <li>Opret profil</li>
            <li>Gemte jobs</li>
          </ul>
        </div>
        <div>
          <h4>For arbejdsgivere</h4>
          <ul>
            <li>Virksomhedsprofil</li>
            <li>Opret annonce</li>
            <li>Jobannoncering</li>
            <li>Rekruttering</li>
          </ul>
        </div>
        <div>
          <h4>Links</h4>
          <ul>
            <li>Om Gratissimo</li>
            <li>Job hos os</li>
            <li>For investore</li>
            <li>Presse</li>
          </ul>
        </div>
        <div>
          <NyhedsbrevsTilmelding />
        </div>
        <div>
          <p>Fidusvej 23</p>
          <p>9230 Øster Lundby</p>
          <p>+45 22 13 22 13</p>
          <div className={styles.some}>
            <Image src="/Icon/SoMe/LinkedIn Circled.png" alt="LinkedIn" width={30} height={30} />
            <Image src="/Icon/SoMe/Facebook.png" alt="Facebook" width={30} height={30} />
            <Image src="/Icon/SoMe/Instagram Circle.png" alt="Instagram" width={30} height={30} />
            <Image src="/Icon/SoMe/Google Plus.png" alt="Google" width={30} height={30} />
          </div>
        </div>
      </div>
    </footer>
  );
}