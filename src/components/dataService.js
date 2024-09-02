let projectsCache = null;
let cacheTimestamp = null;
const CACHE_EXPIRATION_TIME = 3600000; 

export const fetchProjectsData = async () => {
  const currentTime = Date.now();

  if (projectsCache && cacheTimestamp && (currentTime - cacheTimestamp) < CACHE_EXPIRATION_TIME) {
    console.log("Returning cached data");
    return projectsCache;
  }

  console.log("Fetching new data");
  try {
    const response = await fetch("https://cms.moonshotmedia.in/api/projects?populate=*&pagination[limit]=-1");
    const results = await response.json();
    const projectsData = results.data.map((item) => flattenObject(item));

    const homeProjects = await Promise.all(
      projectsData
        .map(async (project) => {
          if (project) {
            const brandResponse = await fetch(`https://cms.moonshotmedia.in/api/brands/${project.attributes_brand_data_id}?populate=Logo`);
            const brandResults = await brandResponse.json();

            return {
              id: project.attributes_HomeOrder ? project.attributes_HomeOrder : "",
              indexId: project.id ? project.id : "",
              brand: project.attributes_brand_data_attributes_Name,
              title: project.attributes_Title,
              description: project.attributes_Summary,
              link: project.attributes_VideoURL,
              logo: brandResults.data.attributes.Logo
                ? `https://cdn.moonshotmedia.in/${brandResults.data.attributes.Logo.data.attributes.hash}${brandResults.data.attributes.Logo.data.attributes.ext}`
                : "",
              teaser: project.attributes_TeaserVideo_data_attributes_hash
                ? `https://cdn.moonshotmedia.in/${project.attributes_TeaserVideo_data_attributes_hash}${project.attributes_TeaserVideo_data_attributes_ext}`
                : ""
            };
          }
          return null;
        })
        .filter((project) => project !== null)
    );

    projectsCache = homeProjects;
    cacheTimestamp = Date.now(); // Update the cache timestamp
    console.log("Caching new data");
    return homeProjects;
  } catch (error) {
    console.error('Error fetching data:', error);
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
