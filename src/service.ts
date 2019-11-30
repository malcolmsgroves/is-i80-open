const getIsOpen = async (): Promise<boolean> => {
  const wydot = await fetch(
    "https://www.wyoroad.info/pls/Browse/WRR.STATIC5?SelectedDistrict=1"
  );

  console.log(wydot);
  return true;
};
