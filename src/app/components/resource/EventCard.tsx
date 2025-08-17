import { motion } from "framer-motion";
import React from "react";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  status: "UPCOMING" | "LIVE" | "ENDED";
  registrationLink?: string;
}

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "text-red-600 bg-red-50 border-red-200";
      case "LIVE":
        return "text-green-600 bg-green-50 border-green-200";
      case "ENDED":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getButtonStyle = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white";
      case "LIVE":
        return "bg-red-600 text-white hover:bg-red-700";
      case "ENDED":
        return "bg-gray-400 text-white cursor-not-allowed";
      default:
        return "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white";
    }
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "Register Now";
      case "LIVE":
        return "Join Now";
      case "ENDED":
        return "Event Ended";
      default:
        return "Register Now";
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Left border accent */}
      <div className="absolute left-0 top-0 w-1 h-full bg-red-600"></div>
      
      {/* Status badge */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(event.status)}`}>
          {event.status}
        </span>
      </div>

      {/* Event title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
        {event.title}
      </h3>

      {/* Event description */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {event.description}
      </p>

      {/* Event details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <svg 
            className="h-4 w-4 mr-2 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {event.date} at {event.time}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <svg 
            className="h-4 w-4 mr-2 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {event.duration}
        </div>
      </div>

      {/* Registration button */}
      <motion.button
        className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-200 ${getButtonStyle(event.status)}`}
        whileHover={event.status !== "ENDED" ? { scale: 1.02 } : {}}
        whileTap={event.status !== "ENDED" ? { scale: 0.98 } : {}}
        disabled={event.status === "ENDED"}
        onClick={() => {
          if (event.registrationLink && event.status !== "ENDED") {
            window.open(event.registrationLink, '_blank');
          }
        }}
      >
        {getButtonText(event.status)}
      </motion.button>
    </motion.div>
  );
};

export default EventCard;