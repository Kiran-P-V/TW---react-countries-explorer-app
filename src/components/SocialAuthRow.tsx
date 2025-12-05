import { Button } from "react-bootstrap";
import GoogleIcon from "./icons/GoogleIcon";
import FacebookIcon from "./icons/FacebookIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import TwitterIcon from "./icons/TwitterIcon";

function SocialAuthRow() {
  return (
    <div className="d-flex gap-3 justify-content-center">
      <Button
        variant="outline-secondary"
        className="rounded-circle d-flex align-items-center justify-content-center p-0"
        style={{ width: 36, height: 36 }}
        aria-label="Sign in with Google"
      >
        <GoogleIcon />
      </Button>
      <Button
        variant="outline-secondary"
        className="rounded-circle d-flex align-items-center justify-content-center p-0"
        style={{ width: 36, height: 36 }}
        aria-label="Sign in with Facebook"
      >
        <FacebookIcon />
      </Button>
      <Button
        variant="outline-secondary"
        className="rounded-circle d-flex align-items-center justify-content-center p-0"
        style={{ width: 36, height: 36 }}
        aria-label="Sign in with LinkedIn"
      >
        <LinkedInIcon />
      </Button>
      <Button
        variant="outline-secondary"
        className="rounded-circle d-flex align-items-center justify-content-center p-0"
        style={{ width: 36, height: 36 }}
        aria-label="Sign in with Twitter"
      >
        <TwitterIcon />
      </Button>
    </div>
  );
}

export default SocialAuthRow;
