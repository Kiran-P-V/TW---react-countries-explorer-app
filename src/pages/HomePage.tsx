import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";

function HomePage() {
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <Container className="py-4">
      <h1 className="mb-3">Home</h1>
      <p>Welcome{username ? `, ${username}` : ""}!</p>
      {/* Countries list, slider, and filters will be implemented here. */}
    </Container>
  );
}

export default HomePage;
