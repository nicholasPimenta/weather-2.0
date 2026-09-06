import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import styles from "./SearchForm.module.css";

function SearchForm() {
  return (
    <form role="search" className={styles.formContent} aria-label="Pesquisar clima por cidade">
      <label htmlFor="city-search" className={styles.formLabel}>Nome da cidade</label>
        <MagnifyingGlassIcon size={32} aria-hidden="true" weight="light" />
        <input
          type="search"
          name="city"
          placeholder="Digite o nome da cidade"
          autoComplete="off"
          className={styles.formInput}
          id="city-search" 
        />
        <button type="submit" className={styles.formButton} aria-label="Pesquisar cidade">
          <ArrowRightIcon size={32} aria-hidden="true" weight="light" className={styles.arrowIcon} />
        </button>
    </form>
  );
}

export default SearchForm;
