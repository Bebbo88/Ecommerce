import React from "react";

export default function NotFoundPage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
      }}
    >
      <div className="text-center">
        {/* SVG Illustration */}
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxWidth: "100%", height: "auto" }}
        >
          <defs>
            <linearGradient
              id="cartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#667eea" stopOpacity="1" />
              <stop offset="100%" stopColor="#764ba2" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4facfe" stopOpacity="1" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="1" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circles */}
          <circle cx="80" cy="60" r="40" fill="#667eea" opacity="0.1" />
          <circle cx="320" cy="240" r="50" fill="#764ba2" opacity="0.1" />
          <circle cx="350" cy="80" r="30" fill="#4facfe" opacity="0.15" />

          {/* 404 Text */}
          <text
            x="200"
            y="100"
            fontFamily="Arial, sans-serif"
            fontSize="80"
            fontWeight="bold"
            fill="url(#textGrad)"
            textAnchor="middle"
            opacity="0.3"
          >
            404
          </text>

          {/* Empty Shopping Cart */}
          <g transform="translate(120, 120)">
            {/* Cart Body */}
            <path
              d="M20 30 L160 30 L150 90 L30 90 Z"
              fill="url(#cartGradient)"
              opacity="0.8"
              filter="url(#glow)"
            />

            {/* Cart Handle */}
            <path
              d="M20 30 L10 10 L0 10"
              fill="none"
              stroke="url(#cartGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Cart Grid Lines */}
            <line
              x1="40"
              y1="35"
              x2="35"
              y2="85"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="60"
              y1="35"
              x2="55"
              y2="85"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="80"
              y1="35"
              x2="75"
              y2="85"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="100"
              y1="35"
              x2="95"
              y2="85"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="120"
              y1="35"
              x2="115"
              y2="85"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1="140"
              y1="35"
              x2="135"
              y2="85"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.5"
            />

            {/* Wheels */}
            <circle cx="50" cy="105" r="8" fill="#333" filter="url(#glow)" />
            <circle cx="50" cy="105" r="4" fill="#666" />

            <circle cx="130" cy="105" r="8" fill="#333" filter="url(#glow)" />
            <circle cx="130" cy="105" r="4" fill="#666" />

            {/* Empty indicator - broken heart or sad face inside cart */}
            <g opacity="0.6">
              {/* Question mark floating */}
              <text
                x="90"
                y="70"
                fontFamily="Arial"
                fontSize="40"
                fill="#ffffff"
                textAnchor="middle"
                fontWeight="bold"
              >
                ?
              </text>
            </g>
          </g>

          {/* Floating elements */}
          <g opacity="0.4">
            <circle cx="60" cy="200" r="3" fill="#667eea">
              <animate
                attributeName="cy"
                values="200;190;200"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="340" cy="150" r="4" fill="#764ba2">
              <animate
                attributeName="cy"
                values="150;140;150"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="100" cy="250" r="2" fill="#4facfe">
              <animate
                attributeName="cy"
                values="250;245;250"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>

        <div style={{ marginTop: "30px" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
            }}
          >
            Oops! Page Not Found
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#666",
              marginBottom: "30px",
              maxWidth: "500px",
              margin: "0 auto 30px",
            }}
          >
            Looks like this page went out of stock!
            <br />
            Let's get you back to shopping.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button
              className="btn btn-lg px-4"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "25px",
                fontWeight: "500",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.6)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(102, 126, 234, 0.4)";
              }}
              onClick={() => (window.location.href = "/")}
            >
              <i className="bi bi-house-fill me-2"></i>
              Back to Home
            </button>

            <button
              className="btn btn-lg px-4"
              style={{
                background: "white",
                color: "#667eea",
                border: "2px solid #667eea",
                borderRadius: "25px",
                fontWeight: "500",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#667eea";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#667eea";
              }}
              onClick={() => (window.location.href = "/products")}
            >
              <i className="bi bi-bag-fill me-2"></i>
              Browse Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
