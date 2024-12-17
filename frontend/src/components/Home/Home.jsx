import { Carousel, IconButton } from "@material-tailwind/react";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

// Sample data for events with images
const events = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    date: "24 Jan, 2024",
    title: "Siempre Son Flores Musica Cubana Salsa Jazz",
    location: "TB St, 44th Street, New York",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    date: "15 Feb, 2024",
    title: "New Age Jazz Festival",
    location: "Central Park, New York",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    date: "10 Mar, 2024",
    title: "Evening of Classical Music",
    location: "Lincoln Center, New York",
  },
];

export default function Home() {
  return (
    <div className="relative max-w-screen-lg mx-auto">
      <Carousel
        className="rounded-2xl"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
      >
        {events.map((event) => (
          <div key={event.id} className="relative h-96 w-full">
            <img
              src={event.image}
              alt={`Event ${event.id}`}
              className="h-96 w-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end rounded-2xl">
              <div className="p-6 text-white space-y-2">
                <div className="bg-blue-600 rounded-full px-3 py-1 inline-block text-sm">
                  Upcoming Event
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CalendarIcon className="h-5 w-5" />
                  <p>{event.date}</p>
                </div>
                <h2 className="text-2xl font-bold">{event.title}</h2>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPinIcon className="h-5 w-5" />
                  <p>{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
