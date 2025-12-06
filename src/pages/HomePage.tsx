import { useEffect, useMemo, useState } from "react";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import HomeHeader from "../components/HomeHeader";
import WelcomeSection from "../components/WelcomeSection";
import HeroCarousel from "../components/HeroCarousel";
import CountryList from "../components/CountryList";
import HomeFooter from "../components/HomeFooter";
import type { CountryCardProps } from "../components/CountryCard";

type RegionFilter = "All" | "Asia" | "Europe";

const API_URL = "https://restcountries.com/v2/all?fields=name,region,flag";
const PAGE_SIZE = 10;

interface ApiCountry {
  name?: { common?: string } | string;
  region?: string;
  flags?: { png?: string; svg?: string };
  flag?: string;
}

function HomePage() {
  const [countries, setCountries] = useState<CountryCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<RegionFilter>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Failed to load countries");
        }
        const data: ApiCountry[] = await res.json();
        const mapped: CountryCardProps[] = data
          .map((item) => ({
            name:
              typeof item.name === "string"
                ? item.name
                : (item.name?.common ?? "Unknown"),
            region: item.region ?? "Unknown",
            flag: item.flags?.png ?? item.flags?.svg ?? item.flag,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

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

      {loading ? (
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
