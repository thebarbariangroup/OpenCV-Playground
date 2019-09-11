let uniqueId = 0;

function getUniqueId () {
  return uniqueId++;
}

export default getUniqueId;