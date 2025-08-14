import React from "react";
import {
  Cloud,
  Database,
  Snowflake,
  Search,
  BarChart3,
  FileSpreadsheet,
  Code,
  Zap,
  GitBranch,
  Cpu,
  Server,
  Box,
  Activity,
  GitPullRequest,
} from "lucide-react";

const TechnologyOrbit = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50 p-8">
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl">
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div
            className="absolute w-72 h-72 animate-spin"
            style={{ animationDuration: "25s" }}
          >
            <div className="w-72 h-72 border border-gray-300 rounded-full"></div>

            <div
              className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                animationDuration: "25s",
                animationDirection: "reverse",
              }}
            >
              <Snowflake className="w-6 h-6 text-blue-400" />
            </div>

            <div
              className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{
                top: "20%",
                right: "12px",
                animationDuration: "25s",
                animationDirection: "reverse",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
                alt="Azure"
                className="w-6 h-6"
              />
            </div>

            <div
              className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{
                bottom: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                animationDuration: "25s",
                animationDirection: "reverse",
              }}
            >
              <img
                width="35"
                height="35"
                src="https://img.icons8.com/color/48/ms-excel.png"
                alt="ms-excel"
              />
            </div>

            <div
              className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{
                bottom: "20%",
                left: "12px",
                animationDuration: "25s",
                animationDirection: "reverse",
              }}
            >
              <Database className="w-6 h-6 text-blue-700" />
            </div>

            <div
              className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                animationDuration: "25s",
                animationDirection: "reverse",
              }}
            >
              <img
                width="35"
                height="35"
                src="https://img.icons8.com/fluency/48/sql.png"
                alt="sql"
              />
            </div>
          </div>

          <div
            className="absolute w-56 h-56 animate-spin"
            style={{ animationDuration: "18s", animationDirection: "reverse" }}
          >
            <div className="w-56 h-56 border border-gray-300 rounded-full"></div>

            <div
              className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                animationDuration: "18s",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                alt="AWS"
                className="w-5 h-5"
              />
            </div>

            <div
              className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{ top: "20%", right: "12px", animationDuration: "18s" }}
            >
              <img
                width="25"
                height="35"
                src="https://img.icons8.com/color/48/power-bi.png"
                alt="power-bi"
              />
            </div>

            <div
              className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{ bottom: "20%", right: "12px", animationDuration: "18s" }}
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/tableau-software.png"
                alt="tableau-software"
              />
            </div>
          </div>

          <div
            className="absolute w-40 h-40 animate-spin"
            style={{ animationDuration: "12s" }}
          >
            <div className="w-40 h-40 border border-gray-300 rounded-full"></div>

            <div
              className="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                animationDuration: "12s",
                animationDirection: "reverse",
              }}
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/zoho-analytics.png"
                alt="zoho-analytics"
              />
            </div>

            <div
              className="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border animate-spin"
              style={{
                bottom: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                animationDuration: "12s",
                animationDirection: "reverse",
              }}
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/google-looker.png"
                alt="google-looker"
              />
            </div>
          </div>

          <div className="absolute w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center z-10 animate-pulse shadow-xl">
            <Database className="w-8 h-8 text-white" />
          </div>

          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${
                    i * 30
                  }deg) translateY(-60px)`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "3s",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Powered by Industry-Leading Technologies
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We work with the most advanced tools and platforms in the data
            ecosystem to deliver comprehensive solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnologyOrbit;
