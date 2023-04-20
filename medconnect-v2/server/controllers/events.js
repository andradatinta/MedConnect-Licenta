exports.getEvents = (req, res) => {
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

  res.status(200).json(events);
};
