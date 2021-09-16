export const getText = url => {
  return fetch(url).then( response => response.text( ));
}

export const createMatrix = (primaryArray, secondaryArray, primaryStride, setSize) => {
  let size = (primaryArray.length / primaryStride) * setSize;
  let results = [ ], i = 0;
  while(results.length < size) {
    let set = [].concat(primaryArray.slice(i, i + primaryStride));
    set = set.concat(secondaryArray);
    results = results.concat(set)
    i += primaryStride;
  }
  return results;
}
