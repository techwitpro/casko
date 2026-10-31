export interface JournalMoment {
  id: string;
  time: string;
  title: string;
  image: string;
  description: string;
  offset: boolean;
}

export const JOURNAL_MOMENTS: JournalMoment[] = [
  {
    id: "m1",
    time: "07:00",
    title: "Doors open",
    image: "/images/journal-1.png",
    description: "The morning light hits the espresso bar. First beans in the grinder, fresh buns straight from the oven.",
    offset: false,
  },
  {
    id: "m2",
    time: "09:15",
    title: "Batch brew flow",
    image: "/images/journal-2.png",
    description: "Steam rises off the long communal table. Surfboards resting outside against the whitewashed wall.",
    offset: true,
  },
  {
    id: "m3",
    time: "10:45",
    title: "Second breakfast",
    image: "/images/journal-3.png",
    description: "Stacks of warm ricotta pancakes topped with grilled peaches and fragrant palm-sugar syrup.",
    offset: false,
  },
  {
    id: "m4",
    time: "12:15",
    title: "Noon sun & laughter",
    image: "/images/journal-4.png",
    description: "Batu Bolong traffic hums outside while friends linger over cold brews and savoury egg plates.",
    offset: true,
  },
  {
    id: "m5",
    time: "13:45",
    title: "Iced coconut pours",
    image: "/images/journal-5.png",
    description: "Double espresso poured over chilled fresh coconut milk. The quintessential Canggu refresher.",
    offset: false,
  },
  {
    id: "m6",
    time: "15:00",
    title: "3 PM Ricotta stack",
    image: "/images/journal-6.png",
    description: "Because breakfast belongs to whatever hour you crave it. No judgement, no cut-offs.",
    offset: true,
  },
  {
    id: "m7",
    time: "16:15",
    title: "Golden hour softens",
    image: "/images/journal-7.png",
    description: "Amber daylight stretches across the polished concrete floor and wooden counter stools.",
    offset: false,
  },
  {
    id: "m8",
    time: "16:45",
    title: "Last call",
    image: "/images/journal-8.png",
    description: "Final espresso shots pulled, wiping down the counter, packing up beans for tomorrow morning.",
    offset: true,
  },
];
