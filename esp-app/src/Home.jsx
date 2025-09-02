function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "120px",
        padding: "60px 20px",
        background: "linear-gradient(135deg, #f9fafb, #eef2f7)",
        borderRadius: "12px",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#222" }}>
        Welcome to ESP!
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#444",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}
      >
        This is the <strong>Experimental Syntax Platform</strong> for creating
        no-code linguistic experiments.
      </p>
    </div>
  );
}

export default Home;






