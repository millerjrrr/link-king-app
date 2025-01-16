const compareVersions = (
  versionbigger: string,
  versionsmaller: string,
): boolean => {
  const versionbiggerParts = versionbigger
    .split(".")
    .map(Number);
  const versionsmallerParts = versionsmaller
    .split(".")
    .map(Number);

  const maxLength = Math.max(
    versionbiggerParts.length,
    versionsmallerParts.length,
  );

  for (let i = 0; i < maxLength; i++) {
    const v1 = versionbiggerParts[i] || 0; // Default to 0 if the part doesn't exist
    const v2 = versionsmallerParts[i] || 0; // Default to 0 if the part doesn't exist

    if (v1 > v2) {
      return true;
    }
    if (v1 < v2) {
      return false;
    }
  }

  return false;
};

export default compareVersions;
