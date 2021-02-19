const fetchJobs = async () => {
  const locations = ["toronto", "vancouver", "boston"];

  return await locations.reduce(async (jobsAccumulator, location) => {
    const jobPostingsCall = await fetch(
      `https://jobs.github.com/positions.json?description=javascript&location=${location}`
    );

    const jobPostings = await jobPostingsCall.json();

    jobsAccumulator.push({
      location,
      jobPostings,
    });

    return jobsAccumulator;
  }, []);
};
const result = fetchJobs();
