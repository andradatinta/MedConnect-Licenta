exports.getEvents = (req, res, next) => {
  const events = [
    {
      title: "Event 1",
      date: "2023-04-10",
    },
    {
      title: "Event 2",
      date: "2023-04-12",
    },
  ];

  res.json(events);
};
