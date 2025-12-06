function WelcomeSection() {
  return (
    <div className="text-center mt-5 mb-4">
      <div className="d-md-none">
        <div className="border-top border-dark border-4 mb-3" />
        <h2 className="fw-bold fs-1 mb-0">WELCOME</h2>
        <div className="border-top border-dark border-4 mt-3" />
      </div>
      <div className="d-none d-md-flex align-items-center justify-content-center mb-3">
        <div className="w-100 border-top border-4 border-dark align-self-start mt-2" />
        <h2 className="fw-bold fs-1 mx-3 mb-0 lh-1 text-nowrap">WELCOME</h2>
        <div className="w-100 border-bottom border-4 border-dark align-self-end mb-1" />
      </div>
    </div>
  );
}

export default WelcomeSection;
