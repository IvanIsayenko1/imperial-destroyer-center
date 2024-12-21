import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchAllValues } from "@/services/api/swapi";
import { ELEMENTS_PER_PAGE, SORT_DIRECTIONS } from "@/constants/constants";
import "./Page.css";
import { Paginator } from "@/components/ui/paginator/Paginator";
import { Card } from "@/components/ui/card/Card";
import { Filters } from "@/components/ui/filters/Filters";
import { List } from "@/components/ui/list/List";
import { NoResults } from "@/components/ui/noResults/NoResults";
import { Error } from "@/components/ui/error/Error";
import { Loading } from "@/components/ui/loading/Loading";
import { PageTitle } from "@/components/ui/pageTitle/PageTitle";

export interface PageConfig<P> {
  texts: {
    mainTitle: string;
    loadingMessage: string;
    filterInputPlaceholder: string;
    filterMessage: string;
  };
  fetchUrl: string;
  sortOptions: { label: string; value: string }[];
  cardProperties: Array<keyof P>;
  name: string;
  debounceTime: number;
  getImage: (name: string) => string;
}

type PageProps<P> = {
  config: PageConfig<P>;
};

export const Page = <
  P extends { name: string },
  T extends { result: { properties: P } }
>({
  config,
}: PageProps<P>) => {
  const [values, setValues] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASC);
  const [isFiltering, setIsFiltering] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, config.debounceTime);

  useEffect(() => {
    fetchAllValues<T>(config.fetchUrl)
      .then((values: T[]) => setValues(values))
      .catch((error: Error) => setError(error));

    const savedFilters = localStorage.getItem(config.name);
    if (savedFilters) {
      const { sortBy, sortDirection } = JSON.parse(savedFilters);
      setSortBy(sortBy);
      setSortDirection(sortDirection);
    }
  }, [config.fetchUrl, config.name]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortBy, sortDirection]);

  useEffect(() => {
    localStorage.setItem(
      config.name,
      JSON.stringify({ sortBy, sortDirection })
    );
  }, [config.name, sortBy, sortDirection]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSortBy("");
    setSortDirection(SORT_DIRECTIONS.ASC);
    setCurrentPage(1);
  };

  const filteredAndSortedValues = useMemo(() => {
    console.log("filteredAndSortedValues");
    console.log("debouncedSearchTerm", debouncedSearchTerm);
    console.log("sortBy", sortBy);
    console.log("sortDirection", sortDirection);

    setIsFiltering(true);
    let result = [...values];

    if (debouncedSearchTerm) {
      result = result.filter((starship) =>
        starship.result.properties.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        const valueA = a.result.properties[sortBy as keyof P];
        const valueB = b.result.properties[sortBy as keyof P];

        const comparison =
          typeof valueA === "number" && typeof valueB === "number"
            ? valueA - valueB
            : String(valueA).localeCompare(String(valueB));

        return sortDirection === SORT_DIRECTIONS.ASC ? comparison : -comparison;
      });
    }

    setIsFiltering(false);
    return result;
  }, [values, debouncedSearchTerm, sortBy, sortDirection]);

  const indexOfLastValue = currentPage * ELEMENTS_PER_PAGE;
  const indexOfFirstValue = indexOfLastValue - ELEMENTS_PER_PAGE;

  const currentValues = filteredAndSortedValues.slice(
    indexOfFirstValue,
    indexOfLastValue
  );

  const getPopulatedCardProperties = (value: T) => {
    const populatedCardProperties: { [key: string]: string } = {};
    config.cardProperties.forEach((key) => {
      populatedCardProperties[key as string] = String(
        value.result.properties[key]
      );
    });
    return populatedCardProperties;
  };

  if (error) {
    return <Error message={error.message} />;
  }

  if (values.length === 0) {
    return <Loading text={config.texts.loadingMessage} />;
  }

  return (
    <div className="box-padding">
      <PageTitle
        title={config.texts.mainTitle}
        subtitle={`Showing ${currentValues.length} of ${filteredAndSortedValues.length} elements`}
      />
      <Filters
        config={{
          inputPlaceholder: config.texts.filterInputPlaceholder,
          sortOptions: config.sortOptions,
        }}
        state={{
          searchTerm,
          sortBy,
          sortDirection,
        }}
        callbacks={{
          onSearchChange: setSearchTerm,
          onSortChange: setSortBy,
          onSortDirectionChange: setSortDirection,
          onClearFilters: handleClearFilters,
        }}
      />

      {isFiltering ? (
        <Loading text={config.texts.filterMessage} />
      ) : filteredAndSortedValues.length > 0 ? (
        <>
          <List<T>
            items={currentValues}
            renderItem={(value) => (
              <Card
                imageSrc={config.getImage(value.result.properties.name)}
                name={value.result.properties.name}
                properties={getPopulatedCardProperties(value)}
              />
            )}
          />
          <Paginator
            currentPage={currentPage}
            totalElements={filteredAndSortedValues.length}
            elementsPerPage={ELEMENTS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <NoResults
          searchTerm={searchTerm}
          onClearFilters={handleClearFilters}
        />
      )}
    </div>
  );
};
