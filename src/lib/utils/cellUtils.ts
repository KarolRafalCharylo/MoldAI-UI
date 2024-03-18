// def cell_bounds(cell: str):
//     """Given a cell identifier, return the bounds of the cell in the form
//     (south latitude, north latitude, west longitude, east longitude).



//     Args:
//         cell (str): Cell identifier string, corresponds to a path in the quadtree.

//     Returns:
//         tuple: (south latitude, north latitude, west longitude, east longitude)
//     """
//     # Initialize bounds to the entire world
//     south_lat = -90.0
//     north_lat = 90.0
//     west_lon = -180.0
//     east_lon = 180.0

//     # For each character in the cell identifier, update the bounds by entering the corresponding quadrant
//     for divide in cell:
//         if int(divide) < 2:  # 0 or 1 is north
//             south_lat = (south_lat + north_lat) / 2
//         else:  # 2 or 3 is south
//             north_lat = (south_lat + north_lat) / 2

//         if int(divide) % 2 == 0:  # 0 or 2 is west
//             east_lon = (west_lon + east_lon) / 2
//         else:  # 1 or 3 is east
//             west_lon = (west_lon + east_lon) / 2

//     return south_lat, north_lat, west_lon, east_lon

// convert the above to typescript
/**
 * Given a cell identifier, return the bounds of the cell in the form
 * (south latitude, north latitude, west longitude, east longitude).
 *
 * @export
 * @param {string} cell - Cell identifier string, corresponds to a path in the quadtree.
 * @return {*}  [south latitude, north latitude, west longitude, east longitude]
 */
export function cellBounds(cell: string): [number, number, number, number] {
  let southLat = -90.0;
  let northLat = 90.0;
  let westLon = -180.0;
  let eastLon = 180.0;

  for (const divide of cell) {
    if (parseInt(divide) < 2) {
      southLat = (southLat + northLat) / 2;
    } else {
      northLat = (southLat + northLat) / 2;
    }

    if (parseInt(divide) % 2 === 0) {
      eastLon = (westLon + eastLon) / 2;
    } else {
      westLon = (westLon + eastLon) / 2;
    }
  }

  return [southLat, northLat, westLon, eastLon];
}