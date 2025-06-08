function safeParse(data, keyToRemove = null) {
  try {
    return JSON.parse(data);
  } catch {
    // If parsing fails, clear bad data and return empty array
    if (keyToRemove){
      localStorage.removeItem("archiveData");
    }
    return [];
  }
}

export default safeParse;