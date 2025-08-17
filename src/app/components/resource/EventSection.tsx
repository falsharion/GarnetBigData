import React from "react";
import EventCard, { Event } from "./EventCard";
import NoEvents from "./NoEvents";
import ScrollAnimationTrigger from "../resource/ScrollAnimationTrigger";

interface EventsSectionProps {
  events: Event[];
  isLoading?: boolean;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, isLoading = false }) => {
  if (isLoading) {
    return (
      <ScrollAnimationTrigger id="events-loading">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Loading skeletons */}
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </ScrollAnimationTrigger>
    );
  }

  if (!events || events.length === 0) {
    return (
      <ScrollAnimationTrigger id="no-events">
        <NoEvents />
      </ScrollAnimationTrigger>
    );
  }

  return (
    <ScrollAnimationTrigger id="events-grid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </ScrollAnimationTrigger>
  );
};

export default EventsSection;