import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import styles from "./SearchForm.module.css";
import type { SubmitEvent } from "react";

interface SearchFormProps {
  onSearch: (city: string) => void | Promise<void>;
}

function SearchForm({ onSearch }: SearchFormProps) {

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const getString = (name: string, fallback = ""): string => String(formData.get(name) ?? fallback);
    const city = getString("city").trim();

    if (city) {
      onSearch(city)
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={styles.formContent} aria-label="Pesquisar clima por cidade">
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
