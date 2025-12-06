import { useState } from "react";
import { Nav, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signOut } from "../store/authSlice";

type RegionFilter = "All" | "Asia" | "Europe";

interface HomeHeaderProps {
  filter: RegionFilter;
  onFilterChange: (filter: RegionFilter) => void;
}

function HomeHeader({ filter, onFilterChange }: HomeHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFilterClick = (selectedFilter: RegionFilter) => {
    onFilterChange(selectedFilter);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <div className="mb-3 pb-2">
      <div className="d-md-none">
        <Stack direction="horizontal" className="justify-content-between">
          <div className="fw-bold">Countries</div>
          <button
            className="btn p-0 border-0 bg-transparent"
            type="button"
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Stack>

        {isMobileMenuOpen && (
          <div className="mt-3 pt-3 border-top">
            <Nav className="flex-column gap-3">
              {(["All", "Asia", "Europe"] as RegionFilter[]).map((item) => (
                <Nav.Link
                  key={item}
                  onClick={() => handleFilterClick(item)}
                  className={`p-0 text-decoration-none cursor-pointer ${
                    filter === item ? "text-dark fw-semibold" : "text-muted"
                  }`}
                >
                  {item}
                </Nav.Link>
              ))}
              <Nav.Link
                onClick={handleLogout}
                className="p-0 text-decoration-none text-danger fw-semibold cursor-pointer"
              >
                Logout
              </Nav.Link>
            </Nav>
          </div>
        )}
      </div>

      <Stack
        direction="horizontal"
        className="justify-content-between d-none d-md-flex"
      >
        <div className="fw-bold">Countries</div>
        <div className="d-flex gap-4">
          <Nav className="gap-4">
            {(["All", "Asia", "Europe"] as RegionFilter[]).map((item) => (
              <Nav.Link
                key={item}
                onClick={() => onFilterChange(item)}
                className={`p-0 text-decoration-none cursor-pointer ${
                  filter === item
                    ? "text-dark fw-semibold border-bottom border-dark border-2"
                    : "text-muted"
                }`}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
          <div
            className="border-end border-dark mx-2"
            style={{ height: "24px", alignSelf: "center" }}
          />
          <Nav.Link
            onClick={handleLogout}
            className="p-0 text-decoration-none text-danger cursor-pointer"
          >
            Logout
          </Nav.Link>
        </div>
      </Stack>
    </div>
  );
}

export default HomeHeader;
