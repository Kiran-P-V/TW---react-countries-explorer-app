import { Row } from "react-bootstrap";
import SocialAuthRow from "./common/SocialAuthRow";

function HomeFooter() {
  return (
    <Row className="justify-content-center text-center mt-5 pt-4">
      <div className="d-flex gap-3 justify-content-center mb-3">
        <SocialAuthRow />
      </div>
      <div className="small text-muted mb-1">Example@email.com</div>
      <div className="small text-muted">
        Copyright © 2023 Name. All rights reserved.
      </div>
    </Row>
  );
}

export default HomeFooter;
