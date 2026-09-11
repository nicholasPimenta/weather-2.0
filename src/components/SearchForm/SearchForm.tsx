import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import styles from "./SearchForm.module.css";
import type { SubmitEvent } from "react";

interface SearchFormProps {
  onSearch: (city: string) => void | Promise<void>;
  isLoading: boolean;
  onEmptySearch: () => void;
}

function SearchForm({ onSearch, isLoading, onEmptySearch }: SearchFormProps) {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const getString = (name: string, fallback = ""): string =>
      String(formData.get(name) ?? fallback);
    const city = getString("city").trim();

    if (!city) {
      onEmptySearch();

      return;
    }
    onSearch(city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={styles.formContent}
      aria-label="Pesquisar clima por cidade"
      aria-busy={isLoading}
    >
      <label htmlFor="city-search" className={styles.formLabel}>
        Nome da cidade
      </label>
      <MagnifyingGlassIcon size={32} aria-hidden="true" weight="light" className={styles.searchIcon} />
      <input
        type="search"
        name="city"
        placeholder="Ex.: Salvador, BR"
        autoComplete="off"
        className={styles.formInput}
        id="city-search"
        disabled={isLoading}
      />
      <button
        type="submit"
        className={styles.formButton}
        aria-label={isLoading ? "Buscando clima" : "Pesquisar cidade"}
        disabled={isLoading}
      >
          <ArrowRightIcon
            size={32}
            aria-hidden="true"
            weight="light"
          />

      </button>
    </form>
  );
}

export default SearchForm;
