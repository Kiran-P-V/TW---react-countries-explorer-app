import { Row } from "react-bootstrap";
import CountryCard from "./CountryCard";
import type { CountryCardProps } from "./CountryCard";

interface CountryListProps {
  countries: CountryCardProps[];
}

function CountryList({ countries }: CountryListProps) {
  return (
    <Row className="gy-3">
      {countries.map((country) => (
        <CountryCard
          key={country.name}
          name={country.name}
          region={country.region}
          flag={country.flag}
        />
      ))}
    </Row>
  );
}

export default CountryList;
