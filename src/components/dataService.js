let projectsCache = null;
let cacheTimestamp = null;
const CACHE_EXPIRATION_TIME = 3600000;

export const fetchProjectsData = async () => {
  const currentTime = Date.now();

  if (
    projectsCache &&
    cacheTimestamp &&
    currentTime - cacheTimestamp < CACHE_EXPIRATION_TIME
  ) {
    // console.log("Returning cached data");
    return projectsCache;
  }

  // console.log("Fetching new data");
  try {
    const response = await fetch(
      "https://cms.suncitystudios.in/api/projects?populate=*&pagination[limit]=1000"
    );
    const results = await response.json();
    const projectsData = results.data.map((item) => flattenObject(item));

    const homeProjects = await Promise.all(
      projectsData
        .map(async (project) => {
          if (project) {
            // console.log(project);
            const brandResponse = await fetch(
              `https://cms.suncitystudios.in/api/brands/${project.brand_documentId}?populate=Logo`
            );
            const brandResults = await brandResponse.json();

            return {
              id: project.HomeOrder ? project.HomeOrder : "",
              indexId: project.id ? project.id : "",
              workId: project.WorkOrder ? project.WorkOrder : "",
              brand: project.brand_Name ? project.brand_Name : "",
              title: project.Title ? project.Title : "",
              created: project.createdAt,
              teaser: project.TeaserVideo_url ? project.TeaserVideo_url : "",
              description: project.Summary ? project.Summary : "",
              link: project.VideoURL ? project.VideoURL : "",
              logo: brandResults.data.Logo?.url
                ? brandResults.data.Logo.url
                : "",
              // logo: brandResults.data.attributes.Logo
              //   ? `https://cdn.suncitystudios.in/${brandResults.data.attributes.Logo.data.attributes.hash}${brandResults.data.attributes.Logo.data.attributes.ext}`
              //   : "",
              // teaser: project.attributes_TeaserVideo_data_attributes_hash
              //   ? `https://cdn.suncitystudios.in/${project.attributes_TeaserVideo_data_attributes_hash}${project.attributes_TeaserVideo_data_attributes_ext}`
              //   : ""
            };
          }
          return null;
        })
        .filter((project) => project !== null)
    );

    projectsCache = homeProjects;
    cacheTimestamp = Date.now(); // Update the cache timestamp
    // console.log("Caching new data");
    return homeProjects;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchDirectorData = async () => {
  try {
    const response = await fetch(
      "https://cms.suncitystudios.in/api/directors?populate=*&pagination[limit]=1000"
    );
    const results = await response.json();
    const directorData = results.data.map((item) => flattenObject(item));
    return directorData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const flattenObject = (obj, parentKey = "", res = {}) => {
  for (let key in obj) {
    let propName = parentKey ? `${parentKey}_${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};
