import Image from 'next/image';
import { customerOrganizations } from '../content';
import styles from './client-trust-rail.module.css';

export function ClientTrustRail() {
  return <section className={styles.section} aria-labelledby="hrms-clients-title">
    <div className={styles.heading}>
      <div><span>FEATURED CLIENTS</span><h2 id="hrms-clients-title">Trusted by 2,500+ clients</h2></div>
      <div><p>Trusted by organizations across industries and 7+ countries.</p><small>The logos below are a selection from our 2,500+ client base.</small></div>
    </div>
    <div className={styles.viewport} aria-label="Selected Indian Infotech clients">
      <div className={styles.track}>
        <ul className={styles.logos}>{customerOrganizations.map(customer => <li key={customer.name}><Image src={customer.logo} alt={customer.name} width={150} height={68} sizes="150px" /></li>)}</ul>
        <ul className={styles.logos} aria-hidden="true">{customerOrganizations.map(customer => <li key={customer.name}><Image src={customer.logo} alt="" width={150} height={68} sizes="150px" /></li>)}</ul>
      </div>
    </div>
    <div className={styles.footer}><span>PEOPLE OPERATIONS · PAYROLL · WORKFORCE MANAGEMENT</span><span>{customerOrganizations.length} featured organizations <i aria-hidden="true">↗</i></span></div>
  </section>;
}
