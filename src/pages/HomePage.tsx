import { useEffect, useMemo, useState } from "react";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchCountries } from "../store/countrySlice";
import HomeHeader from "../components/HomeHeader";
import WelcomeSection from "../components/WelcomeSection";
import HeroCarousel from "../components/HeroCarousel";
import CountryList from "../components/CountryList";
import HomeFooter from "../components/HomeFooter";

type RegionFilter = "All" | "Asia" | "Europe";

const PAGE_SIZE = 10;

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: countries,
    status,
    error,
  } = useSelector((state: RootState) => state.countries);

  const [filter, setFilter] = useState<RegionFilter>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  const filteredCountries = useMemo(() => {
    if (filter === "All") return countries;
    return countries.filter(
      (c) => c.region?.toLowerCase() === filter.toLowerCase(),
    );
  }, [countries, filter]);

  const visibleCountries = filteredCountries.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredCountries.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleFilterChange = (newFilter: RegionFilter) => {
    setFilter(newFilter);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <Container className="py-4">
      <HomeHeader filter={filter} onFilterChange={handleFilterChange} />

      <WelcomeSection />

      <HeroCarousel />

      {error && <Alert variant="danger">{error}</Alert>}

      {status === "loading" ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <CountryList countries={visibleCountries} />

          {canLoadMore && (
            <div className="text-center my-4">
              <Button
                variant="dark"
                className="rounded-0 px-4"
                onClick={handleLoadMore}
              >
                Load more
              </Button>
            </div>
          )}

          {!filteredCountries.length && !error && (
            <div className="text-center text-muted py-4">
              No countries available for this region.
            </div>
          )}
        </>
      )}

      <HomeFooter />
    </Container>
  );
}

export default HomePage;
