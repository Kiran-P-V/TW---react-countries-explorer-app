import { Card, Col } from "react-bootstrap";

export interface CountryCardProps {
  name: string;
  region?: string;
  flag?: string;
}

function CountryCard({ name, region, flag }: CountryCardProps) {
  return (
    <Col md={6} className="mb-3">
      <Card className="h-100 border-2 rounded-0 shadow-sm">
        <Card.Body className="d-flex align-items-center gap-3 py-3">
          <div
            className="border rounded-1 d-flex align-items-center justify-content-center"
            style={{ width: 48, height: 36, backgroundColor: "#f8f9fa" }}
          >
            {flag ? (
              <img
                src={flag}
                alt={name}
                className="img-fluid"
                style={{ maxHeight: 32 }}
              />
            ) : (
              <span
                className="text-muted"
                style={{ fontSize: 20, lineHeight: 1 }}
                aria-hidden
              >
                🏳️
              </span>
            )}
          </div>
          <div>
            <div className="fw-semibold small mb-1">{name}</div>
            {region && <div className="text-muted small">{region}</div>}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CountryCard;
